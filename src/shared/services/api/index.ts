// api.ts
import { APP_URL_API } from "@/shared/utils/constants";
import { globalNavigate } from "@/shared/utils/routers/helpers";
import { useAuth } from "../auth";
import logger from "../logging";

type FetchRequestConfig = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
  path: string;
  filter?: Record<string, any>;
  _retry?: boolean;
};


export async function fetchWithAuth<T = any>({
  path,
  filter,
  _retry = false,
  ...config
}: FetchRequestConfig): Promise<T> {
  const url = buildUrl(path, filter);

  // Get the access token from useAuth state
  const { accessToken } = useAuth.getState();

  // Setup headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...(config.headers || {}),
  };

  // Handle JSON body
  if (
    config.body &&
    typeof config.body !== "string" &&
    headers["Content-Type"] === "application/json"
  ) {
    config.body = JSON.stringify(config.body);
  }

  // Merge headers into config
  config.headers = headers;

  // Make the request
  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (error) {
    // Handle network errors
    logger.error("Network error:", error);

    return Promise.reject(error);
  }

  // Handle 401 Unauthorized
  if (response.status === 401 && !_retry) {
    // Try to refresh the token and retry
    tryToRefreshToken<T>({ path, filter, config, headers });
  }

  // Handle other error statuses
  assertError(response);
  // Parse and return the response data
  try {
    const data = (await response.json()) as T;
    return data;
  } catch (parseError) {
    logger.error("Error parsing response JSON:", parseError);
    return Promise.reject(parseError);
  }
}

async function assertError(response: Response) {
  if (response.ok) {
    return;
  }

  if (response.status === 500 || response.status === 404) {
    logger.error("API request error:", response);
    return Promise.reject(response);
  }

  // For other errors, log and reject
  logger.error("API request error:", response);

  // Parse error response
  const errorData = await response.json().catch(() => null);
  return Promise.reject({ response, data: errorData });

}

async function tryToRefreshToken<T>({ path, filter, config, headers }: any) {
  try {
    const { accessToken: newAccessToken } = await useAuth.getState().refresh();
    // Update the Authorization header
    headers.Authorization = `Bearer ${newAccessToken}`;
    // Retry the request with updated headers and _retry flag
    return fetchWithAuth<T>({ path, filter, _retry: true, ...config });
  } catch (refreshError) {
    // Refresh token failed, logout and redirect
    logger.error("Token refresh failed:", refreshError);

    useAuth.getState().logout();
    globalNavigate?.("/app/login");
    return Promise.reject(refreshError);
  }
}

export async function authApiFetch<T = any>(config: FetchRequestConfig): Promise<T> {
  return fetchWithAuth<T>(config);
}

export async function apiFetch<T = any>(config: FetchRequestConfig): Promise<T> {
  return fetchWithAuth<T>(config);
}

export function buildUrl(
  path: string,
  filter?: Record<string, any> | URLSearchParams
): string {
  const url = new URL(path, APP_URL_API);
  if (filter) {
    const params = new URLSearchParams(filter as Record<string, string>);
    url.search = params.toString();
  }
  return url.toString();
}

export async function allowedPermission(error: { response: Response; data: any; }): Promise<boolean> {
  if (error.response.status === 403) {
    if (error.data?.message?.includes("not have permission")) {
      return false;
    }
  }
  return true;
}


import { APP_URL_API } from "@/shared/utils/constants";
import { globalNavigate } from "@/shared/utils/routers/helpers";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuth } from "../auth";
import logger from "../logging";

type AdditionalRequestProps = {
  path: string;
  filter?: Record<string, any>;
};

type Props = AxiosRequestConfig<any> & AdditionalRequestProps;

const instance = axios.create({
  baseURL: APP_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.response.use(null, async (error: AxiosError<{ [key: string]: any; }>) => {
  const originalConfig = error.config as { _retry: boolean; } & AxiosRequestConfig;

  const isBearer =
    typeof originalConfig?.headers?.Authorization === "string" &&
    originalConfig.headers.Authorization.includes("Bearer");

  if (!isBearer) {
    useAuth.getState().logout();
    logger.error("Non-Bearer token detected. Logging out.");
  }

  // handle 500 errors
  if (error?.response?.status === 500) {

    logger.error("API request error, server:", error);

    return Promise.reject(error);
  }

  // handle 404 errors

  if (error?.response?.status === 404) {
    logger.error("API request error, server:", error);

    return Promise.reject(error);
  }

  // handle 401 errors
  if (error?.response?.status === 401 && !originalConfig?._retry) {
    originalConfig._retry = true;
    try {
      const { accessToken } = await useAuth.getState().refresh();
      if (originalConfig.headers) {
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      logger.debug("Token refreshed. Retrying original request.");

      return instance(originalConfig);
    } catch (_error) {
      logger.error("Token refresh failed:", _error);

      useAuth.getState().logout();
      globalNavigate?.("/app/login");
      return Promise.reject(_error);
    }
  }

  logger.error("API request error:", error);


  return Promise.reject(error);
});

export async function authApiFetch({ path, filter, ...axiosConfig }: Props): Promise<AxiosResponse<any, any>> {
  const url = buildUrl(path, filter);

  const { accessToken = "" } = useAuth.getState();

  return instance
    .request({
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: filter ?? {},
      ...axiosConfig,
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export default async function apifetch({ path, filter, ...axiosConfig }: Props): Promise<AxiosResponse<any, any>> {
  const url = buildUrl(path, filter);

  const accessToken = await useAuth.getState().accessToken;

  return instance
    .request({
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: filter ?? {},
      ...axiosConfig,
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function buildUrl(path: string, filter?: Record<string, any> | URLSearchParams): string {
  const url = new URL(`${path}`, `${APP_URL_API}`);
  return url.toString();
}

export const allowedPermission = (error: AxiosError<{ [key: string]: any; }>) => {
  if (error.response?.status === 403 || error.response?.data?.message.includes("not have permission")) {
    return false;
  }
  return true;
};

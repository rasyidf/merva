import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../auth";
import logger from "../logging";
import { Notify } from "../notifications";
import { globalNavigate } from "../../utils/routers/helpers";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount >= 3) {
          logger.info("Max retries reached. No more retries.");
          return false;
        }

        const axiosError = error as AxiosError;

        const errorMessages: Record<number, string> = {
          500: "Server error. No more retries.",
          404: "404 error. No more retries.",
          403: "403 error. No more retries.",
          401: "401 error. Logging out.",
          0: "Unknown error. Retrying...",
        };
        const errorCode = axiosError?.response?.status ?? 0;
        const errorMessage = errorMessages[errorCode];
        if (errorMessage) {
          logger.error(errorMessage, errorCode);
          if (errorCode === 500) {
            Notify.error("Server bermasalah", "Ada masalah pada server. Silakan coba lagi nanti.", {
              id: "server-error",
            });
            return false;
          }
          if (errorCode === 401) {
            useAuth.getState().logout();
            Notify.error("Sesi Anda telah berakhir", "Anda akan diarahkan ke halaman login.", {
              id: "auth-error",
            });
            return false;
          }
          if (errorCode === 403) {
            Notify.error("Authentikasi Error", "Anda tidak diizinkan untuk mengakses halaman ini.");
            globalNavigate("..");
            return false;
          }
        }

        logger.info("Retrying...");
        return true;
      },
      retryDelay: (failureCount) => Math.min(failureCount * 1000, 30000),
      refetchOnMount: false, // Prevent unnecessary refetch on component mount
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 5,
      placeholderData: keepPreviousData,
      enabled: true,
    },
  },
});

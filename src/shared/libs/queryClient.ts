import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if ((error as AxiosError).status === 404) {
          console.info("404 error, no retry");
          return false;
        }
        return failureCount < 3;
      },
      retryDelay(failureCount, error) {
        if ((error as AxiosError).status === 404) {
          return Number.POSITIVE_INFINITY;
        }
        return Math.min(failureCount * 1000, 30000);
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 5,
      networkMode: "online",
      placeholderData: keepPreviousData,
      enabled: true,
    },
  },
});

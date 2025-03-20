import { isNetworkError, isTimeoutError } from "../converters/errorHandlers";

// Error handling utilities
export const errors = {
  // Error type checks
  is: {
    network: isNetworkError,
    timeout: isTimeoutError,
    validation: (error: any) => error?.name === 'ValidationError',
    notFound: (error: any) => error?.status === 404,
    unauthorized: (error: any) => error?.status === 401,
    forbidden: (error: any) => error?.status === 403,
  },

  // Error creation helpers
  create: {
    validation: (message: string) => ({
      name: 'ValidationError',
      message,
    }),
    notFound: (resource: string) => ({
      status: 404,
      message: `${resource} not found`,
    }),
  },
} as const;
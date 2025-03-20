// Base error interface
export interface AppError extends Error {
  code?: string;
  status?: number;
  data?: Record<string, any>;
}

// API specific errors
export interface ApiError extends AppError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

// Validation errors
export interface ValidationError extends AppError {
  code: 'VALIDATION_ERROR';
  errors: Record<string, string[]>;
}

// Auth errors
export interface AuthError extends AppError {
  code: 'AUTH_ERROR' | 'TOKEN_EXPIRED' | 'UNAUTHORIZED';
  status: 401 | 403;
}

// Network errors
export interface NetworkError extends AppError {
  code: 'NETWORK_ERROR' | 'TIMEOUT';
}

// Type guard functions
export const isApiError = (error: unknown): error is ApiError => {
  return (
    error != null &&
    typeof error === 'object' &&
    'status' in error &&
    'data' in error &&
    typeof (error as ApiError).data?.message === 'string'
  );
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return (
    error != null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as ValidationError).code === 'VALIDATION_ERROR'
  );
};

export const isAuthError = (error: unknown): error is AuthError => {
  return (
    error != null &&
    typeof error === 'object' &&
    'code' in error &&
    ['AUTH_ERROR', 'TOKEN_EXPIRED', 'UNAUTHORIZED'].includes((error as AuthError).code)
  );
};

export const isNetworkError = (error: unknown): error is NetworkError => {
  return (
    error != null &&
    typeof error === 'object' &&
    'code' in error &&
    ['NETWORK_ERROR', 'TIMEOUT'].includes((error as NetworkError).code)
  );
};
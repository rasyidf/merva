// Core type definitions
export * from "./auth";
export * from "./table";
export * from "./utils";
export * from "./errors";
export * from "./versionConfig";
export * from "./navigationConfig";
export * from "./routeConfig";
export * from "./featureMetadata";
export * from "./thirdPartyLocalization";

// Common type utilities
export type {
  PartialDeep,
  PartialKeys,
  RequiredKeys,
  Overwrite,
  DeepKeys,
  DeepValue,
  NoInfer,
  Getter
} from "./utils";

// Error type guards
export {
  isApiError,
  isValidationError,
  isAuthError,
  isNetworkError,
} from "./errors";

// Feature-specific types
export type { FeatureMetadata } from "./featureMetadata";
export type { NavigationConfig, NavigationPlacement } from "./navigationConfig";
export type { RouteConfig } from "./routeConfig";

// Auth types
export type { 
  AuthState,
  LoginCredentials,
  RegistrationData,
  TokenResponse
} from "./auth";

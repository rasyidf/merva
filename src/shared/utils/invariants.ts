const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix: string = "Invariant failed";

/**
 * Throw an error if the condition fails, Strip out error messages for production
 * @param condition The condition to check
 * @param message (Optional) The error message to throw (or a function that returns the error message)
 */
export function invariant(condition: any, message?: string | (() => string)): asserts condition {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  const provided: string | undefined = typeof message === "function" ? message() : message;

  const value: string = provided ? `${prefix}: ${provided}` : prefix;
  throw new Error(value);
}

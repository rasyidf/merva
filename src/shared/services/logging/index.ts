import { isDev } from "@/shared/utils/constants";
import { type ILogger, LogLevel, createLoggingService } from "./service"; // Replace with the actual path

export const logger = createLoggingService(isDev ? LogLevel.DEBUG : LogLevel.WARN); // Set the initial log level and emoji usage

// Example Subscriber: Sentry Logger
const sentryLogger: ILogger = {
  debug: (message: string, ...optionalParams: unknown[]) => {
    // Implement your Sentry debug logging logic here
    // For example, Sentry.captureMessage(`DEBUG: ${message}`);
  },
  info: (message: string, ...optionalParams: unknown[]) => {
    // Implement your Sentry info logging logic here
    // For example, Sentry.captureMessage(`INFO: ${message}`);
  },
  warn: (message: string, ...optionalParams: unknown[]) => {
    // Implement your Sentry warn logging logic here
    // For example, Sentry.captureMessage(`WARN: ${message}`);
  },
  error: (message: string, ...optionalParams: unknown[]) => {
    // Implement your Sentry error logging logic here
    // For example, Sentry.captureException(new Error(message));
  },
};

const getPrefix = (level: LogLevel, enabled = true, useEmoji = true): string => {
  if (!enabled) {
    return "";
  }

  switch (level) {
    case LogLevel.DEBUG:
      return useEmoji ? "🐞: " : "DEBUG: ";
    case LogLevel.INFO:
      return useEmoji ? "ℹ️: " : "INFO: ";
    case LogLevel.WARN:
      return useEmoji ? "⚠️: " : "WARN: ";
    case LogLevel.ERROR:
      return useEmoji ? "❌: " : "ERROR: ";
    default:
      return "";
  }
};
const consoleLogger: ILogger = {
  debug: (message: string, ...optionalParams: unknown[]) => {
    console.debug(`${getPrefix(LogLevel.DEBUG)}${message}`, ...optionalParams);
  },
  info: (message: string, ...optionalParams: unknown[]) => {
    console.info(`${getPrefix(LogLevel.INFO)}${message}`, ...optionalParams);
  },
  warn: (message: string, ...optionalParams: unknown[]) => {
    console.warn(`${getPrefix(LogLevel.WARN)}${message}`, ...optionalParams);
  },
  error: (message: string, ...optionalParams: unknown[]) => {
    console.error(`${getPrefix(LogLevel.ERROR)}${message}`, ...optionalParams);
  },
};

logger.subscribe(sentryLogger);
logger.subscribe(consoleLogger);

export default logger;

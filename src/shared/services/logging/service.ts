export interface ILogger {
  debug(message: string, ...optionalParams: unknown[]): void;
  info(message: string, ...optionalParams: unknown[]): void;
  warn(message: string, ...optionalParams: unknown[]): void;
  error(message: string, ...optionalParams: unknown[]): void;
}

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

type Subscriber = {
  [key in keyof ILogger]: (message: string, ...optionalParams: unknown[]) => void;
};

type LoggingService = {
  logLevel: LogLevel;
  subscribers: Subscriber[];
  subscribe: (logger: ILogger) => void;
  unsubscribe: (logger: ILogger) => void;
  debug: (message: string, ...optionalParams: unknown[]) => void;
  info: (message: string, ...optionalParams: unknown[]) => void;
  warn: (message: string, ...optionalParams: unknown[]) => void;
  error: (message: string, ...optionalParams: unknown[]) => void;
};

export const createLoggingService = (logLevel: LogLevel = LogLevel.INFO): LoggingService => {
  const subscribers: Subscriber[] = [];

  const shouldLog = (level: LogLevel): boolean => level >= logLevel;

  const notifySubscribers = (method: keyof ILogger, message: string, optionalParams: unknown[]): void => {
    for (const subscriber of subscribers) {
      subscriber[method](message, ...optionalParams);
    }
  };

  return {
    logLevel,
    subscribers,
    subscribe: (logger: ILogger): void => {
      const subscriber: Subscriber = {
        debug: (message: string, ...optionalParams: unknown[]) => logger.debug(message, ...optionalParams),
        info: (message: string, ...optionalParams: unknown[]) => logger.info(message, ...optionalParams),
        warn: (message: string, ...optionalParams: unknown[]) => logger.warn(message, ...optionalParams),
        error: (message: string, ...optionalParams: unknown[]) => logger.error(message, ...optionalParams),
      };

      subscribers.push(subscriber);
    },

    unsubscribe: (logger: ILogger): void => {
      const index = subscribers.findIndex((subscriber) => subscriber.debug === logger.debug);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    },

    debug: (message: string, ...optionalParams: unknown[]): void => {
      if (shouldLog(LogLevel.DEBUG)) {
        notifySubscribers("debug", message, optionalParams);
      }
    },

    info: (message: string, ...optionalParams: unknown[]): void => {
      if (shouldLog(LogLevel.INFO)) {
        notifySubscribers("info", message, optionalParams);
      }
    },

    warn: (message: string, ...optionalParams: unknown[]): void => {
      if (shouldLog(LogLevel.WARN)) {
        notifySubscribers("warn", message, optionalParams);
      }
    },

    error: (message: string, ...optionalParams: unknown[]): void => {
      if (shouldLog(LogLevel.ERROR)) {
        notifySubscribers("error", message, optionalParams);
      }
    },
  };
};

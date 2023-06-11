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

export class LoggingService implements ILogger {
	private static instance: LoggingService;
	private logLevel: LogLevel;
	private subscribers: ILogger[];

	private constructor(logLevel: LogLevel = LogLevel.INFO) {
		this.logLevel = logLevel;
		this.subscribers = [];
	}

	public static getInstance(): LoggingService {
		if (!LoggingService.instance) {
			LoggingService.instance = new LoggingService();
		}
		return LoggingService.instance;
	}

	public setLogLevel(logLevel: LogLevel): void {
		this.logLevel = logLevel;
	}

	public subscribe(logger: ILogger): void {
		this.subscribers.push(logger);
	}

	public unsubscribe(logger: ILogger): void {
		this.subscribers = this.subscribers.filter(
			(subscriber) => subscriber !== logger,
		);
	}

	private shouldLog(level: LogLevel): boolean {
		return level >= this.logLevel;
	}

	private notifySubscribers(
		method: keyof ILogger,
		message: string,
		optionalParams: unknown[],
	): void {
		this.subscribers.forEach((subscriber) => {
			subscriber[method](message, ...optionalParams);
		});
	}

	debug(message: string, ...optionalParams: unknown[]): void {
		if (this.shouldLog(LogLevel.DEBUG)) {
			console.debug(`DEBUG: ${message}`, ...optionalParams);
			this.notifySubscribers("debug", message, optionalParams);
		}
	}

	info(message: string, ...optionalParams: unknown[]): void {
		if (this.shouldLog(LogLevel.INFO)) {
			console.info(`INFO: ${message}`, ...optionalParams);
			this.notifySubscribers("info", message, optionalParams);
		}
	}

	warn(message: string, ...optionalParams: unknown[]): void {
		if (this.shouldLog(LogLevel.WARN)) {
			console.warn(`WARN: ${message}`, ...optionalParams);
			this.notifySubscribers("warn", message, optionalParams);
		}
	}

	error(message: string, ...optionalParams: unknown[]): void {
		if (this.shouldLog(LogLevel.ERROR)) {
			console.error(`ERROR: ${message}`, ...optionalParams);
			this.notifySubscribers("error", message, optionalParams);
		}
	}
}

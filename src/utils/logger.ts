/**
 * Logger utility for the application
 * Provides consistent logging across client and server environments
 */

// Log levels
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// Log entry structure
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

// Logger configuration
interface LoggerConfig {
  minLevel: LogLevel;
  includeTimestamp: boolean;
  includeContext: boolean;
}

// Default configuration
const defaultConfig: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  includeTimestamp: true,
  includeContext: true,
};

// Log level priorities (higher number = higher priority)
const logLevelPriority: Record<LogLevel, number> = {
  error: 4,
  warn: 3,
  info: 2,
  debug: 1,
};

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Log a message at the specified level
   */
  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    // Check if this log level should be logged
    if (logLevelPriority[level] < logLevelPriority[this.config.minLevel]) {
      return;
    }

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };

    // Format and output the log
    this.outputLog(logEntry);
  }

  /**
   * Output the log entry to the appropriate destination
   */
  private outputLog(logEntry: LogEntry): void {
    // In a browser environment, use console
    if (typeof window !== 'undefined') {
      this.outputToConsole(logEntry);
    } 
    // In a server environment, we could send to a logging service
    else {
      this.outputToConsole(logEntry);
      // In production, you might want to send logs to a service like:
      // this.sendToLoggingService(logEntry);
    }
  }

  /**
   * Output log to console with appropriate formatting
   */
  private outputToConsole(logEntry: LogEntry): void {
    const { level, message, timestamp, context, error } = logEntry;
    
    // Format timestamp if needed
    const timeString = this.config.includeTimestamp 
      ? `[${timestamp.toISOString()}] ` 
      : '';
    
    // Format context if needed
    const contextString = this.config.includeContext && context 
      ? ` Context: ${JSON.stringify(context)}` 
      : '';
    
    // Format error if present
    const errorString = error 
      ? `\nError: ${error.message}\nStack: ${error.stack}` 
      : '';
    
    // Create the full log message
    const fullMessage = `${timeString}[${level.toUpperCase()}] ${message}${contextString}${errorString}`;
    
    // Use appropriate console method based on log level
    switch (level) {
      case 'error':
        console.error(fullMessage);
        break;
      case 'warn':
        console.warn(fullMessage);
        break;
      case 'info':
        console.info(fullMessage);
        break;
      case 'debug':
        console.debug(fullMessage);
        break;
      default:
        console.log(fullMessage);
    }
  }

  /**
   * Send log to external logging service (placeholder for future implementation)
   */
  private sendToLoggingService(logEntry: LogEntry): void {
    // This is where you would implement sending logs to:
    // - Sentry
    // - Loggly
    // - Datadog
    // - Custom logging API
    // etc.
    
    // Example implementation:
    /*
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    }).catch((err) => {
      // If logging fails, we can't do much except log to console
      console.error('Failed to send log to logging service:', err);
    });
    */
  }

  /**
   * Log an error message
   */
  error(message: string, context?: Record<string, any>, error?: Error): void {
    this.log('error', message, context, error);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }
}

// Create and export a default logger instance
export const logger = new Logger();

// Export the Logger class for custom instances if needed
export default Logger;
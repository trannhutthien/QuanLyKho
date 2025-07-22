// Centralized logging service với different levels
export class LoggingService {
  private static instance: LoggingService;

  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  info(message: string, data?: any): void {
    console.log(`ℹ️ [INFO] ${message}`, data || '');
  }

  success(message: string, data?: any): void {
    console.log(`✅ [SUCCESS] ${message}`, data || '');
  }

  warning(message: string, data?: any): void {
    console.warn(`⚠️ [WARNING] ${message}`, data || '');
  }

  error(message: string, error?: any): void {
    console.error(`❌ [ERROR] ${message}`, error || '');
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🐛 [DEBUG] ${message}`, data || '');
    }
  }
}

export const logger = LoggingService.getInstance();
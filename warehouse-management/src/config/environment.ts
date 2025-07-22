// Environment configuration với type safety
interface DatabaseConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  port?: number;
}

interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'production' | 'test';
  database: DatabaseConfig;
  security: {
    passwordMinLength: number;
    sessionTimeout: number;
  };
}

export const config: AppConfig = {
  name: 'Warehouse Management System',
  version: '1.0.0',
  environment: (process.env.NODE_ENV as any) || 'development',
  
  database: {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '123456',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'QuanLyKhoHang',
    port: parseInt(process.env.DB_PORT || '1433')
  },
  
  security: {
    passwordMinLength: 6,
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
  }
};
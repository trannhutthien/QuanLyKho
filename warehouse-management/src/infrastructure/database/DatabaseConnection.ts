import sql from 'mssql';

export interface DatabaseConfig {
  server: string;
  port: number;
  database: string;
  user: string;
  password: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
    enableArithAbort: boolean;
  };
}

// Cấu hình kết nối SQL Server local
const dbConfig: DatabaseConfig = {
  server: 'localhost',
  port: 1433,
  database: 'QUANLY_KHOHANG',
  user: 'sa',
  password: 'your_password_here', // Thay bằng password SQL Server của bạn
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: sql.ConnectionPool | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<sql.ConnectionPool> {
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    try {
      console.log('🔌 Đang kết nối SQL Server...');
      this.pool = new sql.ConnectionPool(dbConfig);
      await this.pool.connect();
      console.log('✅ Kết nối SQL Server thành công!');
      return this.pool;
    } catch (error) {
      console.error('❌ Lỗi kết nối SQL Server:', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }

  public getPool(): sql.ConnectionPool | null {
    return this.pool;
  }
}

export const dbConnection = DatabaseConnection.getInstance();
export { sql };
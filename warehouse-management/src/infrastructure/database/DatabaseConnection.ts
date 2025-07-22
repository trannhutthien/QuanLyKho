import sql from 'mssql';

// Database connection singleton với SQL Server
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: sql.ConnectionPool | null = null;

  private config: sql.config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'QuanLyKhoHang',
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<sql.ConnectionPool> {
    try {
      if (!this.pool) {
        this.pool = await sql.connect(this.config);
        console.log('✅ Database connected successfully');
      }
      return this.pool;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log('✅ Database disconnected');
      }
    } catch (error) {
      console.error('❌ Database disconnect failed:', error);
      throw error;
    }
  }

  public async testConnection(): Promise<boolean> {
    try {
      const pool = await this.connect();
      const result = await pool.request().query('SELECT 1 as test');
      return result.recordset.length > 0;
    } catch (error) {
      console.error('❌ Database test failed:', error);
      return false;
    }
  }
}

export const dbConnection = DatabaseConnection.getInstance();
export { sql };

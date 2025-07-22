import { dbConnection } from '../database/DatabaseConnection';

export class StartupService {
  private static dbConnection = dbConnection;

  public static async initialize(): Promise<void> {
    try {
      console.log('🚀 Khởi động ứng dụng Warehouse Management...');
      
      // Test database connection
      await this.testDatabaseConnection();
      
      // Verify database schema
      await this.verifyDatabaseSchema();
      
      console.log('✅ Khởi động thành công!');
      console.log('🎉 Ứng dụng đã sẵn sàng!');
      
    } catch (error) {
      console.error('❌ Lỗi khởi động ứng dụng:', error);
      throw error;
    }
  }

  private static async testDatabaseConnection(): Promise<void> {
    try {
      console.log('🔌 Đang kết nối tới SQL Server...');
      const pool = await this.dbConnection.connect();
      
      // Test simple query
      const result = await pool.request().query('SELECT 1 as test');
      console.log('🧪 Test connection thành công:', result.recordset[0]);
      
    } catch (error) {
      console.error('❌ Lỗi kết nối database:', error);
      throw error;
    }
  }

  private static async verifyDatabaseSchema(): Promise<void> {
    try {
      const pool = await this.dbConnection.connect();
      
      // Check if all 9 tables exist
      const tables = [
        'NguoiDung', 
        'KhoHang', 
        'HangHoa', 
        'TonKho',
        'PhieuNhap',
        'ChiTietPhieuNhap',
        'PhieuXuat', 
        'ChiTietPhieuXuat',
        'ThongBao'
      ];
      
      console.log('🔍 Kiểm tra 9 tables chính...');
      
      for (const tableName of tables) {
        const result = await pool.request()
          .input('tableName', tableName)
          .query(`
            SELECT COUNT(*) as count 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = @tableName
          `);
        
        if (result.recordset[0].count === 0) {
          throw new Error(`❌ Bảng ${tableName} không tồn tại`);
        }
        console.log(`✅ ${tableName} - OK`);
      }
      
      console.log('✅ Tất cả 9 tables đã được kiểm tra thành công!');
      
      // Show detailed data count
      const stats = await this.getDatabaseStats(pool);
      console.log('📊 Thống kê dữ liệu hiện có:');
      console.log(`   - ${stats.users} người dùng`);
      console.log(`   - ${stats.warehouses} kho hàng`);
      console.log(`   - ${stats.products} sản phẩm`);
      console.log(`   - ${stats.inventory} bản ghi tồn kho`);
      console.log(`   - ${stats.importOrders} phiếu nhập`);
      console.log(`   - ${stats.exportOrders} phiếu xuất`);
      console.log(`   - ${stats.notifications} thông báo`);
      
    } catch (error) {
      console.error('❌ Lỗi kiểm tra schema:', error);
      throw error;
    }
  }

  private static async getDatabaseStats(pool: any): Promise<any> {
    const [users, warehouses, products, inventory, importOrders, exportOrders, notifications] = await Promise.all([
      pool.request().query('SELECT COUNT(*) as count FROM NguoiDung'),
      pool.request().query('SELECT COUNT(*) as count FROM KhoHang'),
      pool.request().query('SELECT COUNT(*) as count FROM HangHoa'),
      pool.request().query('SELECT COUNT(*) as count FROM TonKho'),
      pool.request().query('SELECT COUNT(*) as count FROM PhieuNhap'),
      pool.request().query('SELECT COUNT(*) as count FROM PhieuXuat'),
      pool.request().query('SELECT COUNT(*) as count FROM ThongBao')
    ]);

    return {
      users: users.recordset[0].count,
      warehouses: warehouses.recordset[0].count,
      products: products.recordset[0].count,
      inventory: inventory.recordset[0].count,
      importOrders: importOrders.recordset[0].count,
      exportOrders: exportOrders.recordset[0].count,
      notifications: notifications.recordset[0].count
    };
  }
}


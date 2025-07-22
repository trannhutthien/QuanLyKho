import { dbConnection, sql } from '../database/DatabaseConnection';
import type { User, CreateUserRequest } from '../../domain/entities/User';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';

export interface LoginResult {
  success: boolean
  data?: {
    user: User
    token: string
  }
  message?: string
}

// Repository thực tế kết nối SQL Server để quản lý User
export class UserRepository implements IUserRepository {
  
  async findByEmail(email: string): Promise<User | null> {
    try {
      const pool = await dbConnection.connect();
      const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`
          SELECT maNguoiDung as id, email, matKhau, tenNguoiDung as hoTen,
                 quyenTruyCap as vaiTro, trangThai, ngayTao as createdAt, 
                 ngayCapNhat as updatedAt
          FROM NguoiDung 
          WHERE email = @email AND trangThai = 1
        `);
      
      if (result.recordset.length === 0) return null;
      
      const user = result.recordset[0];
      return {
        ...user,
        vaiTro: user.vaiTro === 2 ? 'admin' : 'user',
        trangThai: user.trangThai === 1
      };
    } catch (error) {
      console.error('❌ Lỗi tìm user theo email:', error);
      throw error;
    }
  }

  async create(userData: CreateUserRequest): Promise<User> {
    try {
      const pool = await dbConnection.connect();
      const maNguoiDung = `USER${Date.now().toString().slice(-6)}`;
      
      await pool.request()
        .input('maNguoiDung', sql.NVarChar, maNguoiDung)
        .input('tenNguoiDung', sql.NVarChar, userData.tenNguoiDung)
        .input('email', sql.NVarChar, userData.email)
        .input('matKhau', sql.NVarChar, userData.matKhau)
        .input('quyenTruyCap', sql.TinyInt, userData.quyenTruyCap || 1)
        .query(`
          INSERT INTO NguoiDung (maNguoiDung, tenNguoiDung, email, matKhau, quyenTruyCap)
          VALUES (@maNguoiDung, @tenNguoiDung, @email, @matKhau, @quyenTruyCap)
        `);
      
      return await this.findByEmail(userData.email) as User;
    } catch (error) {
      console.error('❌ Lỗi tạo user:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const pool = await dbConnection.connect();
      const result = await pool.request()
        .input('id', sql.NVarChar, id)
        .query(`
          SELECT maNguoiDung as id, email, matKhau, tenNguoiDung as hoTen,
                 quyenTruyCap as vaiTro, trangThai, ngayTao as createdAt,
                 ngayCapNhat as updatedAt
          FROM NguoiDung 
          WHERE maNguoiDung = @id AND trangThai = 1
        `);
      
      if (result.recordset.length === 0) return null;
      
      const user = result.recordset[0];
      return {
        ...user,
        vaiTro: user.vaiTro === 2 ? 'admin' : 'user',
        trangThai: user.trangThai === 1
      };
    } catch (error) {
      console.error('❌ Lỗi tìm user theo ID:', error);
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    try {
      const pool = await dbConnection.connect();
      await pool.request()
        .input('id', sql.NVarChar, id)
        .input('tenNguoiDung', sql.NVarChar, userData.hoTen)
        .input('email', sql.NVarChar, userData.email)
        .query(`
          UPDATE NguoiDung 
          SET tenNguoiDung = @tenNguoiDung, email = @email, ngayCapNhat = GETDATE()
          WHERE maNguoiDung = @id
        `);
      
      return await this.findById(id) as User;
    } catch (error) {
      console.error('❌ Lỗi cập nhật user:', error);
      throw error;
    }
  }
}


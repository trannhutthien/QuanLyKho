export interface PhieuNhap {
  maPhieuNhap: string;
  maKho: string;
  maNguoiDung: string;
  ngayNhap: Date;
  tongTien: number;
  ghiChu?: string;
  trangThai: number; // 1: Hoàn thành, 0: Hủy
}

export interface ChiTietPhieuNhap {
  id: number;
  maPhieuNhap: string;
  maHang: string;
  soLuong: number;
  donGia: number;
  thanhTien: number; // Computed column
}

export interface PhieuXuat {
  maPhieuXuat: string;
  maKho: string;
  maNguoiDung: string;
  ngayXuat: Date;
  tongTien: number;
  ghiChu?: string;
  trangThai: number;
}

export interface ChiTietPhieuXuat {
  id: number;
  maPhieuXuat: string;
  maHang: string;
  soLuong: number;
  donGia: number;
  thanhTien: number; // Computed column
}
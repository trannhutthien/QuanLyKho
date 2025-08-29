-- Tạo database
CREATE DATABASE QUANLY_KHOHANG
COLLATE Vietnamese_CI_AS;
GO

USE QUANLY_KHOHANG;
GO

-- Bảng Người dùng
CREATE TABLE NguoiDung (
    maNguoiDung NVARCHAR(10) PRIMARY KEY,
    tenNguoiDung NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    matKhau NVARCHAR(255) NOT NULL,
    quyenTruyCap TINYINT DEFAULT 1, -- 1: User, 2: Admin
    trangThai TINYINT DEFAULT 1, -- 1: Active, 0: Inactive
    ngayTao DATETIME2 DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 DEFAULT GETDATE()
);
GO

-- Trigger để tự động cập nhật ngayCapNhat cho NguoiDung
CREATE TRIGGER tr_NguoiDung_Update
ON NguoiDung
AFTER UPDATE
AS
BEGIN
    UPDATE NguoiDung 
    SET ngayCapNhat = GETDATE()
    FROM NguoiDung n
    INNER JOIN inserted i ON n.maNguoiDung = i.maNguoiDung;
END;
GO

-- Bảng Kho hàng
CREATE TABLE KhoHang (
    maKho NVARCHAR(10) PRIMARY KEY,
    tenKho NVARCHAR(100) NOT NULL,
    diaChi NVARCHAR(MAX),
    sucChua INT DEFAULT 0,
    trangThai TINYINT DEFAULT 1,
    ngayTao DATETIME2 DEFAULT GETDATE()
);
GO

-- Bảng Hàng hóa
CREATE TABLE HangHoa (
    maHang NVARCHAR(10) PRIMARY KEY,
    tenHang NVARCHAR(200) NOT NULL,
    moTa NVARCHAR(MAX),
    donViTinh NVARCHAR(50),
    giaNhap DECIMAL(15,2) DEFAULT 0,
    giaBan DECIMAL(15,2) DEFAULT 0,
    ngayHetHan DATE,
    ngayTao DATETIME2 DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 DEFAULT GETDATE()
);
GO

-- Trigger để tự động cập nhật ngayCapNhat cho HangHoa
CREATE TRIGGER tr_HangHoa_Update
ON HangHoa
AFTER UPDATE
AS
BEGIN
    UPDATE HangHoa 
    SET ngayCapNhat = GETDATE()
    FROM HangHoa h
    INNER JOIN inserted i ON h.maHang = i.maHang;
END;
GO

-- Bảng Tồn kho
CREATE TABLE TonKho (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maKho NVARCHAR(10),
    maHang NVARCHAR(10),
    soLuongTon INT DEFAULT 0,
    ngayCapNhat DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_TonKho_KhoHang FOREIGN KEY (maKho) REFERENCES KhoHang(maKho),
    CONSTRAINT FK_TonKho_HangHoa FOREIGN KEY (maHang) REFERENCES HangHoa(maHang),
    CONSTRAINT UQ_TonKho_KhoHang UNIQUE (maKho, maHang)
);
GO

-- Trigger để tự động cập nhật ngayCapNhat cho TonKho
CREATE TRIGGER tr_TonKho_Update
ON TonKho
AFTER UPDATE
AS
BEGIN
    UPDATE TonKho 
    SET ngayCapNhat = GETDATE()
    FROM TonKho t
    INNER JOIN inserted i ON t.id = i.id;
END;
GO

-- Bảng Phiếu nhập
CREATE TABLE PhieuNhap (
    maPhieuNhap NVARCHAR(15) PRIMARY KEY,
    maKho NVARCHAR(10),
    maNguoiDung NVARCHAR(10),
    ngayNhap DATETIME2 DEFAULT GETDATE(),
    tongTien DECIMAL(15,2) DEFAULT 0,
    ghiChu NVARCHAR(MAX),
    trangThai TINYINT DEFAULT 1, -- 1: Hoàn thành, 0: Hủy
    CONSTRAINT FK_PhieuNhap_KhoHang FOREIGN KEY (maKho) REFERENCES KhoHang(maKho),
    CONSTRAINT FK_PhieuNhap_NguoiDung FOREIGN KEY (maNguoiDung) REFERENCES NguoiDung(maNguoiDung)
);
GO

-- Bảng Chi tiết phiếu nhập
CREATE TABLE ChiTietPhieuNhap (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maPhieuNhap NVARCHAR(15),
    maHang NVARCHAR(10),
    soLuong INT NOT NULL,
    donGia DECIMAL(15,2) NOT NULL,
    thanhTien AS (soLuong * donGia) PERSISTED,
    CONSTRAINT FK_ChiTietPhieuNhap_PhieuNhap FOREIGN KEY (maPhieuNhap) REFERENCES PhieuNhap(maPhieuNhap),
    CONSTRAINT FK_ChiTietPhieuNhap_HangHoa FOREIGN KEY (maHang) REFERENCES HangHoa(maHang)
);
GO

-- Bảng Phiếu xuất
CREATE TABLE PhieuXuat (
    maPhieuXuat NVARCHAR(15) PRIMARY KEY,
    maKho NVARCHAR(10),
    maNguoiDung NVARCHAR(10),
    ngayXuat DATETIME2 DEFAULT GETDATE(),
    tongTien DECIMAL(15,2) DEFAULT 0,
    ghiChu NVARCHAR(MAX),
    trangThai TINYINT DEFAULT 1,
    CONSTRAINT FK_PhieuXuat_KhoHang FOREIGN KEY (maKho) REFERENCES KhoHang(maKho),
    CONSTRAINT FK_PhieuXuat_NguoiDung FOREIGN KEY (maNguoiDung) REFERENCES NguoiDung(maNguoiDung)
);
GO

-- Bảng Chi tiết phiếu xuất
CREATE TABLE ChiTietPhieuXuat (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maPhieuXuat NVARCHAR(15),
    maHang NVARCHAR(10),
    soLuong INT NOT NULL,
    donGia DECIMAL(15,2) NOT NULL,
    thanhTien AS (soLuong * donGia) PERSISTED,
    CONSTRAINT FK_ChiTietPhieuXuat_PhieuXuat FOREIGN KEY (maPhieuXuat) REFERENCES PhieuXuat(maPhieuXuat),
    CONSTRAINT FK_ChiTietPhieuXuat_HangHoa FOREIGN KEY (maHang) REFERENCES HangHoa(maHang)
);
GO

-- Bảng Thông báo
CREATE TABLE ThongBao (
    maThongBao NVARCHAR(15) PRIMARY KEY,
    tieuDe NVARCHAR(200) NOT NULL,
    noiDung NVARCHAR(MAX),
    loaiThongBao TINYINT, -- 1: Tồn kho thấp, 2: Hết hạn, 3: Hệ thống
    maNguoiDung NVARCHAR(10),
    daDoc TINYINT DEFAULT 0,
    ngayTao DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_ThongBao_NguoiDung FOREIGN KEY (maNguoiDung) REFERENCES NguoiDung(maNguoiDung)
);
GO

--dữ liệu mẫu 
USE QUANLY_KHOHANG;
GO




-- Th m d? li?u test v?i plain text password
INSERT INTO NguoiDung (maNguoiDung, tenNguoiDung, email, matKhau, quyenTruyCap) VALUES
(N'USER005', N'Nguy?n V n Admin', N'admin@warehousee.com', N'123456', 2),
(N'USER006', N'Tr?n Th? User', N'user@warehousee.com', N'123456', 1),
(N'USER007', N'L  V n Manager', N'manager@warehousee.com', N'123456', 1),
(N'USER008', N'Ph?m Th? Test', N'test@warehousee.com', N'123456', 1);
GO


-- Insert Warehouses
INSERT INTO KhoHang (maKho, tenKho, diaChi, sucChua) VALUES
(N'KHO001', N'Kho Hà Nội', N'123 Đường Láng, Đống Đa, Hà Nội', 10000),
(N'KHO002', N'Kho TP.HCM', N'456 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM', 15000),
(N'KHO003', N'Kho Đà Nẵng', N'789 Đường Lê Duẩn, Hải Châu, Đà Nẵng', 8000),
(N'KHO004', N'Kho Hải Phòng', N'321 Đường Lạch Tray, Ngô Quyền, Hải Phòng', 12000);
GO

-- Insert Products
INSERT INTO HangHoa (maHang, tenHang, moTa, donViTinh, giaNhap, giaBan, ngayHetHan) VALUES
(N'SP001', N'Laptop Dell Inspiron 15 3000', N'Laptop văn phòng, Intel Core i5, RAM 8GB, SSD 256GB', N'Chiếc', 15000000, 18000000, '2025-12-31'),
(N'SP002', N'Chuột không dây Logitech M705', N'Chuột máy tính không dây, pin 3 năm', N'Chiếc', 200000, 300000, '2026-06-30'),
(N'SP003', N'Bàn phím cơ Corsair K70', N'Bàn phím gaming cơ, switch Cherry MX', N'Chiếc', 800000, 1200000, '2025-08-15'),
(N'SP004', N'Màn hình Samsung 24 inch', N'Màn hình LED Full HD, 75Hz', N'Chiếc', 3000000, 4000000, '2025-10-20'),
(N'SP005', N'Ổ cứng SSD Samsung 500GB', N'Ổ cứng thể rắn SATA III', N'Chiếc', 1500000, 2000000, '2027-01-01'),
(N'SP006', N'Tai nghe Sony WH-1000XM4', N'Tai nghe chống ồn không dây', N'Chiếc', 6000000, 8000000, '2025-09-30'),
(N'SP007', N'Webcam Logitech C920', N'Webcam HD 1080p cho họp online', N'Chiếc', 1200000, 1800000, '2026-03-15'),
(N'SP008', N'Router WiFi TP-Link Archer C7', N'Router WiFi AC1750 dual band', N'Chiếc', 800000, 1200000, '2025-11-10'),
(N'SP009', N'USB Kingston 32GB', N'USB 3.0 tốc độ cao', N'Chiếc', 150000, 250000, '2028-01-01'),
(N'SP010', N'Máy in Canon PIXMA G2010', N'Máy in phun màu đa chức năng', N'Chiếc', 3500000, 4500000, '2025-07-20');
GO

-- Insert Stock
INSERT INTO TonKho (maKho, maHang, soLuongTon) VALUES
-- Kho Hà Nội
(N'KHO001', N'SP001', 50),
(N'KHO001', N'SP002', 200),
(N'KHO001', N'SP003', 80),
(N'KHO001', N'SP004', 60),
(N'KHO001', N'SP005', 120),
-- Kho TP.HCM
(N'KHO002', N'SP001', 30),
(N'KHO002', N'SP004', 100),
(N'KHO002', N'SP005', 150),
(N'KHO002', N'SP006', 40),
(N'KHO002', N'SP007', 75),
-- Kho Đà Nẵng
(N'KHO003', N'SP002', 120),
(N'KHO003', N'SP003', 60),
(N'KHO003', N'SP008', 90),
(N'KHO003', N'SP009', 300),
(N'KHO003', N'SP010', 25),
-- Kho Hải Phòng
(N'KHO004', N'SP001', 20),
(N'KHO004', N'SP005', 80),
(N'KHO004', N'SP006', 35),
(N'KHO004', N'SP009', 250),
(N'KHO004', N'SP010', 15);
GO

-- Insert Sample Import Orders
INSERT INTO PhieuNhap (maPhieuNhap, maKho, maNguoiDung, ngayNhap, tongTien, ghiChu) VALUES
(N'PN2024001', N'KHO001', N'USER001', '2024-01-15 09:30:00', 50000000, N'Nhập hàng đầu tháng 1'),
(N'PN2024002', N'KHO002', N'USER002', '2024-01-20 14:15:00', 75000000, N'Nhập hàng bổ sung kho TP.HCM'),
(N'PN2024003', N'KHO003', N'USER003', '2024-01-25 10:45:00', 30000000, N'Nhập hàng mới cho kho Đà Nẵng');
GO

-- Insert Sample Import Details
INSERT INTO ChiTietPhieuNhap (maPhieuNhap, maHang, soLuong, donGia) VALUES
(N'PN2024001', N'SP001', 20, 15000000),
(N'PN2024001', N'SP002', 100, 200000),
(N'PN2024002', N'SP004', 50, 3000000),
(N'PN2024002', N'SP005', 100, 1500000),
(N'PN2024003', N'SP008', 30, 800000),
(N'PN2024003', N'SP009', 200, 150000);
GO

-- Insert Sample Export Orders
INSERT INTO PhieuXuat (maPhieuXuat, maKho, maNguoiDung, ngayXuat, tongTien, ghiChu) VALUES
(N'PX2024001', N'KHO001', N'USER002', '2024-01-28 11:20:00', 25000000, N'Xuất hàng cho đơn hàng KH001'),
(N'PX2024002', N'KHO002', N'USER003', '2024-01-30 16:30:00', 15000000, N'Xuất hàng cho đơn hàng KH002');
GO

-- Insert Sample Export Details
INSERT INTO ChiTietPhieuXuat (maPhieuXuat, maHang, soLuong, donGia) VALUES
(N'PX2024001', N'SP001', 5, 18000000),
(N'PX2024001', N'SP002', 20, 300000),
(N'PX2024002', N'SP004', 10, 4000000),
(N'PX2024002', N'SP005', 15, 2000000);
GO

-- Insert Sample Notifications
INSERT INTO ThongBao (maThongBao, tieuDe, noiDung, loaiThongBao, maNguoiDung, daDoc) VALUES
(N'TB2024001', N'Cảnh báo tồn kho thấp', N'Sản phẩm SP010 - Máy in Canon PIXMA G2010 tại kho Hải Phòng chỉ còn 15 chiếc', 1, N'USER001', 0),
(N'TB2024002', N'Sản phẩm sắp hết hạn', N'Sản phẩm SP003 - Bàn phím cơ Corsair K70 sẽ hết hạn vào 15/08/2025', 2, N'USER001', 0),
(N'TB2024003', N'Thông báo hệ thống', N'Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày 01/02/2024', 3, N'USER002', 1),
(N'TB2024004', N'Cảnh báo tồn kho thấp', N'Sản phẩm SP001 - Laptop Dell Inspiron tại kho Hải Phòng chỉ còn 20 chiếc', 1, N'USER003', 0);
GO

-- Tạo View để xem thông tin tổng hợp
CREATE VIEW vw_TonKhoTongHop AS
SELECT 
    tk.maKho,
    kh.tenKho,
    tk.maHang,
    hh.tenHang,
    hh.donViTinh,
    tk.soLuongTon,
    hh.giaBan,
    (tk.soLuongTon * hh.giaBan) AS giaTriTon,
    hh.ngayHetHan,
    CASE 
        WHEN hh.ngayHetHan < GETDATE() THEN N'Đã hết hạn'
        WHEN hh.ngayHetHan < DATEADD(month, 3, GETDATE()) THEN N'Sắp hết hạn'
        ELSE N'Còn hạn'
    END AS trangThaiHetHan,
    CASE 
        WHEN tk.soLuongTon <= 10 THEN N'Tồn kho thấp'
        WHEN tk.soLuongTon <= 50 THEN N'Tồn kho trung bình'
        ELSE N'Tồn kho đủ'
    END AS trangThaiTonKho
FROM TonKho tk
INNER JOIN KhoHang kh ON tk.maKho = kh.maKho
INNER JOIN HangHoa hh ON tk.maHang = hh.maHang
WHERE kh.trangThai = 1;
GO

PRINT N'✅ Tạo database QUANLY_KHOHANG thành công!';
PRINT N'📊 Đã thêm dữ liệu mẫu:';
PRINT N'   - 4 người dùng (1 admin, 3 user)';
PRINT N'   - 4 kho hàng';
PRINT N'   - 10 sản phẩm';
PRINT N'   - Dữ liệu tồn kho';
PRINT N'   - Phiếu nhập/xuất mẫu';
PRINT N'   - Thông báo mẫu';
PRINT N'🔑 Tài khoản test: admin@warehouse.com / 123456';
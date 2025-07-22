export interface ThongBao {
  maThongBao: string;
  tieuDe: string;
  noiDung?: string;
  loaiThongBao: number; // 1: Tồn kho thấp, 2: Hết hạn, 3: Hệ thống
  maNguoiDung: string;
  daDoc: number; // 0: Chưa đọc, 1: Đã đọc
  ngayTao: Date;
}

export enum LoaiThongBao {
  TON_KHO_THAP = 1,
  HET_HAN = 2,
  HE_THONG = 3
}

export interface CreateNotificationRequest {
  maThongBao: string;
  tieuDe: string;
  noiDung?: string;
  loaiThongBao: LoaiThongBao;
  maNguoiDung: string;
}
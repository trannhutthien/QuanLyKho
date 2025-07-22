import { BaseEntity } from '../../shared/types/common.types'

export interface Product extends BaseEntity {
  maHangHoa: string
  tenHangHoa: string
  moTa?: string
  donViTinh: string
  giaNhap: number
  giaBan: number
  soLuongTonKho: number
  soLuongToiThieu: number
  danhMucId: string
  trangThai: boolean
}
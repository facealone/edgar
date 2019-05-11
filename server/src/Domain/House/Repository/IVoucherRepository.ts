import { Voucher } from '../Voucher.entity';
import { House } from '../House.entity';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
  findOneByHouseAndEmail(house: House, email: string): Promise<Voucher | null>;
  findOneByCode(code: string): Promise<Voucher | null>;
  remove(voucher: Voucher): Promise<void>;
}
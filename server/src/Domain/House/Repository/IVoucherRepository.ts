import { Voucher } from '../Voucher.entity';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
  findOneByCode(code: string): Promise<Voucher | null>;
  remove(voucher: Voucher): Promise<void>;
}

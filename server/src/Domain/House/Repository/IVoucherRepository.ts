import { Voucher } from '../Voucher.entity';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
}

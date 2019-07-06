import { Voucher } from '../Voucher.entity';
import { House } from '../House.entity';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
  findOneByCode(code: string): Promise<Voucher | null>;
  findByHouse(house: House, page: number): Promise<[Voucher[], number]>;
  remove(voucher: Voucher): Promise<void>;
}

import { Voucher } from '../Voucher.entity';
import { House } from '../House.entity';
import { VoucherFiltersDto } from 'src/Infrastructure/House/Controller/Dto/VoucherFiltersDto';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
  findOneByCode(code: string): Promise<Voucher | null>;
  findByHouse(
    house: House,
    filters: VoucherFiltersDto,
  ): Promise<[Voucher[], number]>;
  remove(voucher: Voucher): Promise<void>;
}

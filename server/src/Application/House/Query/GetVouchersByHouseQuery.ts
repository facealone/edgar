import { IQuery } from 'src/Application/IQuery';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';
import { VoucherFiltersDto } from 'src/Infrastructure/House/Controller/Dto/VoucherFiltersDto';

export class GetVouchersByHouseQuery implements IQuery {
  constructor(
    public readonly house: House,
    public readonly user: User,
    public readonly filters: VoucherFiltersDto,
  ) {}
}

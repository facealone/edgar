import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { ShopFiltersDto } from 'src/Infrastructure/Shop/Controller/Dto/ShopFiltersDto';

export class GetShopsByHouseQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly filters: ShopFiltersDto,
  ) {}
}

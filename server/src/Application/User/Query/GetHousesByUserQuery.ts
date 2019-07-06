import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { HouseFiltersDto } from 'src/Infrastructure/House/Controller/Dto/HouseFiltersDto';

export class GetHousesByUserQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly filters: HouseFiltersDto,
  ) {}
}

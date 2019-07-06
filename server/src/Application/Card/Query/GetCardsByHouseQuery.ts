import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { CardFiltersDto } from 'src/Infrastructure/Card/Controller/Dto/CardFiltersDto';

export class GetCardsByHouseQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly filters: CardFiltersDto,
  ) {}
}

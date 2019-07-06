import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';
import { MemberFiltersDto } from 'src/Infrastructure/User/Controller/Dto/MemberFiltersDto';

export class GetUsersByHouseQuery implements IQuery {
  constructor(
    public readonly house: House,
    public readonly user: User,
    public readonly filters: MemberFiltersDto,
  ) {}
}

import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';

export class GetCardsByHouseQuery implements IQuery {
  constructor(public readonly user: User) {}
}

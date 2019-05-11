import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';

export class GetUserHousesByUserQuery implements IQuery {
  constructor(public readonly user: User) {}
}

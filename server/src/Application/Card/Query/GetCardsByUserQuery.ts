import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';

export class GetCardsByUserQuery implements IQuery {
  constructor(public readonly user: User) {}
}

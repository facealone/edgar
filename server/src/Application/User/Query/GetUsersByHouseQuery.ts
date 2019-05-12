import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';

export class GetUsersByHouseQuery implements IQuery {
  constructor(public readonly house: House, public readonly user: User) {}
}

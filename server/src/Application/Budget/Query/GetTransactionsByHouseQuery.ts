import { IQuery } from 'src/Application/IQuery';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

export class GetTransactionsByHouseQuery implements IQuery {
  constructor(public readonly user: User, public readonly house: House) {}
}

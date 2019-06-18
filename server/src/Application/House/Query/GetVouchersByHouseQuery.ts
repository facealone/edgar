import { IQuery } from 'src/Application/IQuery';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

export class GetVouchersByHouseQuery implements IQuery {
  constructor(public readonly house: House, public readonly user: User) {}
}

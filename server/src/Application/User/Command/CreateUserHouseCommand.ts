import { ICommand } from 'src/Application/ICommand';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

export class CreateUserHouseCommand implements ICommand {
  constructor(public readonly house: House, public readonly user: User) {}
}

import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';

export class ChangeCurrentHouseCommand implements ICommand {
  constructor(public readonly user: User, public readonly house: House) {}
}

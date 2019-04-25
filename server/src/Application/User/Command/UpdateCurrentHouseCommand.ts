import { ICommand } from 'src/Application/ICommand';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

export class UpdateCurrentHouseCommand implements ICommand {
  constructor(public readonly user: User, public readonly house: House) {}
}

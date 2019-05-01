import { ICommand } from 'src/Application/ICommand';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';
import { UserRole } from 'src/Domain/User/UserHouse.entity';

export class CreateUserHouseCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly house: House,
    public readonly role: string = UserRole.OWNER,
  ) {}
}

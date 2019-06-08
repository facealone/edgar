import { CommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from './LoginCommand';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { House } from 'src/Domain/House/House.entity';
import { HouseView } from 'src/Application/House/View/HouseView';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
  ) {}

  public execute = async (
    command: LoginCommand,
  ): Promise<AuthenticatedView> => {
    const user = await this.userRepository.findOneByEmail(command.email);

    if (
      !(user instanceof User) ||
      false === this.encryptionAdapter.compare(command.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    const house = user.currentHouse;

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      user.apiToken,
      house instanceof House ? new HouseView(house.id, house.name) : null,
    );
  };
}

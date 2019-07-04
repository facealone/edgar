import { CommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from './LoginCommand';
import { AuthenticatedView } from '../View/AuthenticatedView';
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

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      user.apiToken,
      user.currentHouse
        ? new HouseView(user.currentHouse.id, user.currentHouse.name)
        : null,
    );
  };
}

import { CommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from './LoginCommand';
import { ITokenAdapter } from 'src/Application/Adapter/ITokenAdapter';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { House } from 'src/Domain/House/House.entity';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ITokenAdapter')
    private readonly jwtAdapter: ITokenAdapter,
  ) {}

  public execute = async (
    command: LoginCommand,
  ): Promise<AuthenticatedView> => {
    const user = await this.userRepository.findOneByEmail(command.email);

    if (
      !(user instanceof User) ||
      false === user.isPasswordValid(command.password)
    ) {
      throw new UnauthorizedException();
    }

    const house = user.currentHouse;
    const token = this.jwtAdapter.sign({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName.toUpperCase(),
      email: user.email,
    });

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      token,
      house instanceof House ? house.id : null,
    );
  };
}

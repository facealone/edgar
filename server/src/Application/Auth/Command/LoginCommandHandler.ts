import { CommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from './LoginCommand';
import { ITokenAdapter } from 'src/Application/Adapter/ITokenAdapter';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ITokenAdapter') private readonly jwtAdapter: ITokenAdapter,
  ) {}

  execute = async (command: LoginCommand): Promise<string> => {
    const user = await this.userRepository.findOneByEmail(command.email);

    if (
      !(user instanceof User) ||
      false === user.isPasswordValid(command.password)
    ) {
      throw new UnauthorizedException();
    }

    return this.jwtAdapter.sign({
      id: user.id,
      name: user.getFullName(),
      email: user.email,
    });
  };
}

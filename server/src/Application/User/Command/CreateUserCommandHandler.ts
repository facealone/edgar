import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './CreateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { CanUserCreateAccount } from 'src/Domain/User/CanUserCreateAccount';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly canUserCreateAccount: CanUserCreateAccount,
  ) {}

  execute = async (command: CreateUserCommand): Promise<User> => {
    if (
      false === (await this.canUserCreateAccount.isSatisfiedBy(command.email))
    ) {
      throw new BadRequestException('user.already.exists');
    }

    return await this.userRepository.save(
      new User({
        firstName: command.firstName,
        lastName: command.lastName,
        email: command.email,
        password: command.password,
      }),
    );
  };
}

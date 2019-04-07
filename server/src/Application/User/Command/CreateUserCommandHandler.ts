import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './CreateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { CanUserCreateAccount } from 'src/Domain/User/CanUserCreateAccount';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { Mail } from 'src/Domain/Common/Mail/Mail';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IMailerAdapter') private readonly mailerAdapter: IMailerAdapter,
    private readonly canUserCreateAccount: CanUserCreateAccount,
  ) {}

  execute = async (command: CreateUserCommand): Promise<User> => {
    if (
      false === (await this.canUserCreateAccount.isSatisfiedBy(command.email))
    ) {
      throw new BadRequestException('user.already.exists');
    }

    const user = new User({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      password: command.password,
    });

    await this.userRepository.save(user);

    this.mailerAdapter.send(
      new Mail(command.email, process.env.SENDGRID_TEMPLATE_WELCOME, {
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    );

    return user;
  };
}

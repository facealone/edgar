import { CommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './RegisterCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { WelcomeMail } from 'src/Domain/User/Mail/WelcomeMail';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IMailerAdapter')
    private readonly mailerAdapter: IMailerAdapter,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    private readonly canUserRegister: CanUserRegister,
  ) {}

  public execute = async (
    command: RegisterCommand,
  ): Promise<AuthenticatedView> => {
    if (false === (await this.canUserRegister.isSatisfiedBy(command.email))) {
      throw new BadRequestException('auth.user.already.exists');
    }

    const password = this.encryptionAdapter.hash(command.password);
    const apiToken = this.encryptionAdapter.hash(
      command.email + Date.now().toString(),
    );

    const user = new User({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      password,
      apiToken,
    });

    await this.userRepository.save(user);

    this.mailerAdapter.send(
      new WelcomeMail(command.email, {
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    );

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      apiToken,
      null,
    );
  };
}

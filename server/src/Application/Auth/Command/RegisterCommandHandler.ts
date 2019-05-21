import { CommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './RegisterCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { ITokenAdapter } from 'src/Application/Adapter/ITokenAdapter';
import { WelcomeMail } from 'src/Domain/User/Mail/WelcomeMail';
import { AuthenticatedView } from '../View/AuthenticatedView';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IMailerAdapter')
    private readonly mailerAdapter: IMailerAdapter,
    @Inject('ITokenAdapter')
    private readonly jwtAdapter: ITokenAdapter,
    private readonly canUserRegister: CanUserRegister,
  ) {}

  public execute = async (
    command: RegisterCommand,
  ): Promise<AuthenticatedView> => {
    if (false === (await this.canUserRegister.isSatisfiedBy(command.email))) {
      throw new BadRequestException('auth.user.already.exists');
    }

    const user = new User({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      password: command.password,
    });

    await this.userRepository.save(user);

    this.mailerAdapter.send(
      new WelcomeMail(command.email, {
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    );

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
      null,
    );
  };
}

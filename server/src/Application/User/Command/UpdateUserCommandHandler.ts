import { CommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { UpdateUserCommand } from './UpdateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { LoggedUserView } from '../View/LoggedUserView';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly canUserRegister: CanUserRegister,
  ) {}

  public execute = async (
    command: UpdateUserCommand,
  ): Promise<LoggedUserView> => {
    const { user, firstName, lastName, email } = command;

    if (
      user.email !== email &&
      false === (await this.canUserRegister.isSatisfiedBy(email))
    ) {
      throw new BadRequestException('user.email.already.exists');
    }

    user.update(firstName, lastName, email);

    await this.userRepository.save(user);

    return new LoggedUserView(
      user.id,
      firstName,
      lastName,
      email,
      user.currentHouse ? user.currentHouse.id : null,
    );
  };
}

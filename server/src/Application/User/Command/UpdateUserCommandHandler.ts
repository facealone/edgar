import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from './UpdateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { LoggedUserView } from '../View/LoggedUserView';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = async (
    command: UpdateUserCommand,
  ): Promise<LoggedUserView> => {
    const { user, firstName, lastName, email } = command;

    user.update(firstName, lastName, email);

    const savedUser = await this.userRepository.save(user);
    const house = user.currentHouse;

    return new LoggedUserView(
      savedUser.id,
      savedUser.firstName,
      savedUser.lastName,
      savedUser.email,
      house ? house.id : null,
    );
  };
}

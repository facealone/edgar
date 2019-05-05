import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from './UpdateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = async (command: UpdateUserCommand): Promise<User> => {
    const { user, firstName, lastName, email } = command;

    user.update(firstName, lastName, email);

    return await this.userRepository.save(user);
  };
}

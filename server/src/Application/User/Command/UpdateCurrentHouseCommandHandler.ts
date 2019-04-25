import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCurrentHouseCommand } from './UpdateCurrentHouseCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';

@CommandHandler(UpdateCurrentHouseCommand)
export class UpdateCurrentHouseComandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute = async (command: UpdateCurrentHouseCommand): Promise<User> => {
    const user = command.user;
    user.currentHouse = command.house;

    return await this.userRepository.save(user);
  };
}

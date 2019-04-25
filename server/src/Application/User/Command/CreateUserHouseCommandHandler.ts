import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserHouseCommand } from './CreateUserHouseCommand';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';

@CommandHandler(CreateUserHouseCommand)
export class CreateUserHouseCommandHandler {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  execute = async (command: CreateUserHouseCommand): Promise<UserHouse> => {
    return await this.userHouseRepository.save(
      new UserHouse({
        house: command.house,
        user: command.user,
      }),
    );
  };
}

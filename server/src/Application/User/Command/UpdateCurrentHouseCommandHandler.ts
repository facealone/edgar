import { CommandHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { UpdateCurrentHouseCommand } from './UpdateCurrentHouseCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { CurrentHouseUpdatedView } from '../View/CurrentHouseUpdatedView';

@CommandHandler(UpdateCurrentHouseCommand)
export class UpdateCurrentHouseComandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  execute = async (
    command: UpdateCurrentHouseCommand,
  ): Promise<CurrentHouseUpdatedView> => {
    const { user, house } = command;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    user.updateCurrentHouse(house);

    const { currentHouse } = await this.userRepository.save(user);

    return new CurrentHouseUpdatedView(currentHouse.id);
  };
}

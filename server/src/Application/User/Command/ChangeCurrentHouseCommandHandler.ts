import { CommandHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { ChangeCurrentHouseCommand } from './ChangeCurrentHouseCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { CurrentHouseUpdatedView } from '../View/CurrentHouseUpdatedView';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';

@CommandHandler(ChangeCurrentHouseCommand)
export class ChangeCurrentHouseComandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    command: ChangeCurrentHouseCommand,
  ): Promise<CurrentHouseUpdatedView> => {
    const { user, house } = command;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    user.updateCurrentHouse(house);

    await this.userRepository.save(user);

    return new CurrentHouseUpdatedView(house.id, house.name);
  };
}

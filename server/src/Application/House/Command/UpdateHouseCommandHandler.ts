import { Inject, ForbiddenException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateHouseCommand } from './UpdateHouseCommand';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { HouseView } from '../View/HouseView';

@CommandHandler(UpdateHouseCommand)
export class UpdateHouseCommandHandler {
  constructor(
    @Inject('IHouseRepository')
    private readonly houseRepository: IHouseRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: UpdateHouseCommand): Promise<HouseView> => {
    const { house, name, user } = command;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    house.update(name);

    const savedHouse = await this.houseRepository.save(house);

    return new HouseView(savedHouse.id, savedHouse.name);
  };
}

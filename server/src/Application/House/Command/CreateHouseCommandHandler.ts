import { CommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { CreateHouseCommand } from './CreateHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateUserHouseCommand } from 'src/Application/User/Command/CreateUserHouseCommand';
import { HouseView } from '../View/HouseView';
import { ChangeCurrentHouseCommand } from 'src/Application/User/Command/ChangeCurrentHouseCommand';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';

@CommandHandler(CreateHouseCommand)
export class CreateHouseCommandHandler {
  constructor(
    @Inject('IHouseRepository')
    private readonly repository: IHouseRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  public execute = async (command: CreateHouseCommand): Promise<HouseView> => {
    const { user, name } = command;
    const house = await this.repository.save(new House({ name }));

    const userHouse = await this.commandBus.execute(
      new CreateUserHouseCommand(user, house),
    );
    if (!(userHouse instanceof UserHouse)) {
      throw new BadRequestException();
    }

    await this.commandBus.execute(new ChangeCurrentHouseCommand(user, house));

    return new HouseView(house.id, house.name);
  };
}

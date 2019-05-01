import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateHouseCommand } from './UpdateHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';

@CommandHandler(UpdateHouseCommand)
export class UpdateHouseCommandHandler {
  constructor(
    @Inject('IHouseRepository')
    private readonly houseRepository: IHouseRepository,
  ) {}

  public execute = async (command: UpdateHouseCommand): Promise<House> => {
    const { house, name } = command;
    house.update(name);

    return await this.houseRepository.save(house);
  };
}

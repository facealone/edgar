import { CommandHandler } from '@nestjs/cqrs';
import { CreateHouseCommand } from './CreateHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { Inject } from '@nestjs/common';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';

@CommandHandler(CreateHouseCommand)
export class CreateHouseCommandHandler {
  constructor(
    @Inject('IHouseRepository') private readonly repository: IHouseRepository,
  ) {}

  execute = async (command: CreateHouseCommand): Promise<House> => {
    return await this.repository.save(new House({ name: command.name }));
  };
}

import { GetHouseByIdQuery } from './GetHouseByIdQuery';
import { House } from 'src/Domain/House/House.entity';
import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';

@QueryHandler(GetHouseByIdQuery)
export class GetHouseByIdQueryHandler {
  constructor(
    @Inject('IHouseRepository')
    private readonly houseRepository: IHouseRepository,
  ) {}

  public execute = async (query: GetHouseByIdQuery): Promise<House | null> => {
    return await this.houseRepository.find(query.id);
  };
}

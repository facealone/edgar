import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShopByIdQuery } from './GetShopByIdQuery';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { Shop } from 'src/Domain/Shop/Shop.entity';

@QueryHandler(GetShopByIdQuery)
export class GetShopByIdQueryHandler {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
  ) {}

  public execute = async (query: GetShopByIdQuery): Promise<Shop | null> => {
    return await this.shopRepository.findOneById(query.id);
  };
}

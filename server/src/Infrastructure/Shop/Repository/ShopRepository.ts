import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { Shop } from 'src/Domain/Shop/Shop.entity';
import { House } from 'src/Domain/House/House.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { ShopFiltersDto } from '../Controller/Dto/ShopFiltersDto';

@Injectable()
export class ShopRepository implements IShopRepository {
  constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>,
  ) {}

  public save = async (shop: Shop): Promise<Shop> => {
    return await this.repository.save(shop);
  };

  public findByHouse = async (
    house: House,
    filters: ShopFiltersDto,
  ): Promise<[Shop[], number]> => {
    return await this.repository
      .createQueryBuilder('shop')
      .select(['shop.id', 'shop.name'])
      .where('shop.house = :id', { id: house.id })
      .orderBy('name', 'ASC')
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };

  public findOneById = async (id: string): Promise<Shop | null> => {
    return await this.repository
      .createQueryBuilder('shop')
      .select(['shop.id', 'house.id'])
      .where('shop.id = :id', { id })
      .innerJoin('shop.house', 'house')
      .getOne();
  };
}

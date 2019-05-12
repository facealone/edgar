import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { Shop } from 'src/Domain/Shop/Shop.entity';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class ShopRepository implements IShopRepository {
  constructor(
    @InjectRepository(Shop) private readonly repository: Repository<Shop>,
  ) {}

  public save = async (shop: Shop): Promise<Shop> => {
    return await this.repository.save(shop);
  };

  public findByHouse = async (house: House): Promise<Shop[]> => {
    return await this.repository.find({
      where: { house },
      order: { name: 'ASC' },
    });
  };

  public find = async (id: string): Promise<Shop | null> => {
    return await this.repository.findOne({
      where: { id },
      relations: ['house'],
    });
  };
}

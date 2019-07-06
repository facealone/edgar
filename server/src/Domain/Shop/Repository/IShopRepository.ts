import { Shop } from '../Shop.entity';
import { House } from 'src/Domain/House/House.entity';
import { ShopFiltersDto } from 'src/Infrastructure/Shop/Controller/Dto/ShopFiltersDto';

export interface IShopRepository {
  save(shop: Shop): Promise<Shop>;
  findByHouse(house: House, filters: ShopFiltersDto): Promise<[Shop[], number]>;
  findOneById(id: string): Promise<Shop | null>;
}

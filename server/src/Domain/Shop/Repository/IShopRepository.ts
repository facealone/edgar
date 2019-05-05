import { Shop } from '../Shop.entity';

export interface IShopRepository {
  save(shop: Shop): Promise<Shop>;
}

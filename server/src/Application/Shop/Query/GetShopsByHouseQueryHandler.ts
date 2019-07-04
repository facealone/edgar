import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { GetShopsByHouseQuery } from './GetShopsByHouseQuery';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { ShopView } from '../View/ShopView';

@QueryHandler(GetShopsByHouseQuery)
export class GetShopsByHouseQueryHandler {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (query: GetShopsByHouseQuery): Promise<ShopView[]> => {
    const { user } = query;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const shops = await this.shopRepository.findByHouse(house);
    const shopViews = [];

    for (const shop of shops) {
      shopViews.push(new ShopView(shop.id, shop.name, 0));
    }

    return shopViews;
  };
}

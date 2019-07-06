import { QueryHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { GetShopsByHouseQuery } from './GetShopsByHouseQuery';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { ShopView } from '../View/ShopView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetShopsByHouseQuery)
export class GetShopsByHouseQueryHandler {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetShopsByHouseQuery,
  ): Promise<Pagination<ShopView>> => {
    const { user, filters } = query;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const [shops, total] = await this.shopRepository.findByHouse(
      house,
      filters,
    );
    const shopViews = [];

    for (const shop of shops) {
      shopViews.push(new ShopView(shop.id, shop.name, 0));
    }

    return new Pagination<ShopView>(shopViews, total);
  };
}

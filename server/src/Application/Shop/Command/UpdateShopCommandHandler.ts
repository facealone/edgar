import { CommandHandler } from '@nestjs/cqrs';
import { Inject, ForbiddenException } from '@nestjs/common';
import { UpdateShopCommand } from './UpdateShopCommand';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import { ShopView } from '../View/ShopView';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';

@CommandHandler(UpdateShopCommand)
export class UpdateShopCommandHandler {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: UpdateShopCommand): Promise<ShopView> => {
    const { shop, user, name } = command;

    if (
      false === (await this.isMemberOfHouse.isSatisfiedBy(shop.house, user))
    ) {
      throw new ForbiddenException();
    }

    shop.updateName(name);
    const savedShop = await this.shopRepository.save(shop);

    return new ShopView(savedShop.id, savedShop.name);
  };
}

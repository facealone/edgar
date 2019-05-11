import { CommandHandler } from '@nestjs/cqrs';
import { CreateShopCommand } from './CreateShopCommand';
import { IShopRepository } from 'src/Domain/Shop/Repository/IShopRepository';
import {
  Inject,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Shop } from 'src/Domain/Shop/Shop.entity';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { ShopView } from '../View/ShopView';
import { House } from 'src/Domain/House/House.entity';

@CommandHandler(CreateShopCommand)
export class CreateShopCommandHandler {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: CreateShopCommand): Promise<ShopView> => {
    const { user, name } = command;
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException('user.empty.current_house');
    }

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const shop = await this.shopRepository.save(
      new Shop({
        name,
        house,
        owner: command.user,
      }),
    );

    return new ShopView(shop.id, shop.name);
  };
}

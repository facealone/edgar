import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { Shop } from 'src/Domain/Shop/Shop.entity';
import { ShopRepository } from './Repository/ShopRepository';
import { CreateShopController } from './Controller/CreateShopController';
import { CreateShopCommandHandler } from 'src/Application/Shop/Command/CreateShopCommandHandler';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { GetShopsByHouseQueryHandler } from 'src/Application/Shop/Query/GetShopsByHouseQueryHandler';
import { UpdateShopController } from './Controller/UpdateShopController';
import { GetShopByIdQueryHandler } from 'src/Application/Shop/Query/GetShopByIdQueryHandler';
import { UpdateShopCommandHandler } from 'src/Application/Shop/Command/UpdateShopCommandHandler';
import { GetShopsController } from './Controller/GetShopsController';
import { GetShoppingListItemController } from './Controller/ShoppingList/GetShoppingListItemController';
import { ShoppingListSuggestion } from 'src/Domain/Shop/ShoppingListSuggestion.entity';
import { ShoppingListSuggestionRepository } from './Repository/ShoppingItemSuggestionRepository';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Shop, UserHouse, ShoppingListSuggestion]),
  ],
  controllers: [
    GetShopsController,
    CreateShopController,
    UpdateShopController,
    GetShoppingListItemController,
  ],
  providers: [
    { provide: 'IShopRepository', useClass: ShopRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    {
      provide: 'IShoppingListSuggestionRepository',
      useClass: ShoppingListSuggestionRepository,
    },
    CreateShopCommandHandler,
    GetShopsByHouseQueryHandler,
    IsMemberOfHouse,
    GetShopByIdQueryHandler,
    UpdateShopCommandHandler,
  ],
})
export class ShopModule {}

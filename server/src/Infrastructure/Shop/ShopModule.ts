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

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Shop, UserHouse])],
  controllers: [CreateShopController, UpdateShopController],
  providers: [
    { provide: 'IShopRepository', useClass: ShopRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    CreateShopCommandHandler,
    GetShopsByHouseQueryHandler,
    IsMemberOfHouse,
    GetShopByIdQueryHandler,
    UpdateShopCommandHandler,
  ],
})
export class ShopModule {}

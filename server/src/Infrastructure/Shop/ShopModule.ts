import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { Shop } from 'src/Domain/Shop/Shop.entity';
import { ShopRepository } from './Repository/ShopRepository';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Shop])],
  controllers: [],
  providers: [{ provide: 'IShopRepository', useClass: ShopRepository }],
})
export class ShopModule {}

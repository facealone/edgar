import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { Shop } from 'src/Domain/Shop/Shop.entity';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Shop])],
  controllers: [],
  providers: [],
})
export class ShopModule {}

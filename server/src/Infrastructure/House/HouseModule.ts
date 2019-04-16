import { Module } from '@nestjs/common';
import { BusModule } from '../Common/BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateHouseAction } from './Action/CreateHouseAction';
import { House } from 'src/Domain/House/House.entity';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { HouseRepository } from './Repository/HouseRepository';
import { CreateHouseCommandHandler } from 'src/Application/House/Command/CreateHouseCommandHandler';
import { AuthModule } from '../Auth/AuthModule';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([House, Voucher])],
  controllers: [CreateHouseAction],
  providers: [
    { provide: 'IHouseRepository', useClass: HouseRepository },
    CreateHouseCommandHandler,
  ],
})
export class HouseModule {}

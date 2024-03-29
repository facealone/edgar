import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateHouseController } from './Controller/CreateHouseController';
import { House } from 'src/Domain/House/House.entity';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { HouseRepository } from './Repository/HouseRepository';
import { CreateHouseCommandHandler } from 'src/Application/House/Command/CreateHouseCommandHandler';
import { AuthModule } from '../Auth/AuthModule';
import { CreateVoucherController } from './Controller/Voucher/CreateVoucherController';
import { CreateVoucherCommandHandler } from 'src/Application/House/Command/Voucher/CreateVoucherCommandHandler';
import { CodeGeneratorAdapter } from '../Adapter/CodeGeneratorAdapter';
import { MailerAdapter } from '../Adapter/MailerAdapter';
import { VoucherRepository } from './Repository/VoucherRepository';
import { ConsumeVoucherController } from './Controller/Voucher/ConsumeVoucherController';
import { ConsumeVoucherCommandHandler } from 'src/Application/House/Command/Voucher/ConsumeVoucherCommandHandler';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { UpdateHouseController } from './Controller/UpdateHouseController';
import { GetHouseByIdQueryHandler } from 'src/Application/House/Query/GetHouseByIdQueryHandler';
import { UpdateHouseCommandHandler } from 'src/Application/House/Command/UpdateHouseCommandHandler';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { GetHousesController } from './Controller/GetHousesController';
import { GetHouseVouchersController } from './Controller/Voucher/GetHouseVouchersController';
import { GetVouchersByHouseQueryHandler } from 'src/Application/House/Query/GetVouchersByHouseQueryHandler';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([House, Voucher, UserHouse]),
  ],
  controllers: [
    GetHousesController,
    CreateHouseController,
    GetHouseVouchersController,
    CreateVoucherController,
    ConsumeVoucherController,
    UpdateHouseController,
  ],
  providers: [
    { provide: 'IHouseRepository', useClass: HouseRepository },
    { provide: 'IVoucherRepository', useClass: VoucherRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    { provide: 'ICodeGeneratorAdapter', useClass: CodeGeneratorAdapter },
    { provide: 'IMailerAdapter', useClass: MailerAdapter },
    CreateHouseCommandHandler,
    UpdateHouseCommandHandler,
    CreateVoucherCommandHandler,
    ConsumeVoucherCommandHandler,
    GetHouseByIdQueryHandler,
    GetVouchersByHouseQueryHandler,
    IsMemberOfHouse,
  ],
})
export class HouseModule {}

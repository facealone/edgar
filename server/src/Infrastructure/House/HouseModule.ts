import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateHouseAction } from './Action/CreateHouseAction';
import { House } from 'src/Domain/House/House.entity';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { HouseRepository } from './Repository/HouseRepository';
import { CreateHouseCommandHandler } from 'src/Application/House/Command/CreateHouseCommandHandler';
import { AuthModule } from '../Auth/AuthModule';
import { CreateVoucherAction } from './Action/Voucher/CreateVoucherAction';
import { CanCreateVoucher } from 'src/Domain/House/CanCreateVoucher';
import { CreateVoucherCommandHandler } from 'src/Application/House/Command/Voucher/CreateVoucherCommandHandler';
import { CodeGeneratorAdapter } from '../Adapter/CodeGeneratorAdapter';
import { MailerAdapter } from '../Adapter/MailerAdapter';
import { VoucherRepository } from './Repository/VoucherRepository';
import { ConsumeVoucherAction } from './Action/Voucher/ConsumeVoucherAction';
import { ConsumeVoucherCommandHandler } from 'src/Application/House/Command/Voucher/ConsumeVoucherCommandHandler';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { UpdateHouseAction } from './Action/UpdateHouseAction';
import { GetHouseByIdQueryHandler } from 'src/Application/House/Query/GetHouseByIdQueryHandler';
import { UpdateHouseCommandHandler } from 'src/Application/House/Command/UpdateHouseCommandHandler';
import { HouseMemberGuard } from '../User/Guard/HouseMemberGuard';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([House, Voucher, UserHouse]),
  ],
  controllers: [
    CreateHouseAction,
    CreateVoucherAction,
    ConsumeVoucherAction,
    UpdateHouseAction,
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
    CanCreateVoucher,
    IsMemberOfHouse,
    HouseMemberGuard,
  ],
})
export class HouseModule {}

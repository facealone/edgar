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
import { CanConsumeVoucher } from 'src/Domain/House/CanConsumeVoucher';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([House, Voucher, UserHouse]),
  ],
  controllers: [CreateHouseAction, CreateVoucherAction, ConsumeVoucherAction],
  providers: [
    { provide: 'IHouseRepository', useClass: HouseRepository },
    { provide: 'IVoucherRepository', useClass: VoucherRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    { provide: 'ICodeGeneratorAdapter', useClass: CodeGeneratorAdapter },
    { provide: 'IMailerAdapter', useClass: MailerAdapter },
    CreateHouseCommandHandler,
    CreateVoucherCommandHandler,
    ConsumeVoucherCommandHandler,
    CanCreateVoucher,
    CanConsumeVoucher,
  ],
})
export class HouseModule {}

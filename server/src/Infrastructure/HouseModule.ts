import { Module } from '@nestjs/common';
import { BusModule } from './Common/BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateHouseAction } from './House/Action/CreateHouseAction';
import { House } from 'src/Domain/House/House.entity';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { HouseRepository } from './House/Repository/HouseRepository';
import { CreateHouseCommandHandler } from 'src/Application/House/Command/CreateHouseCommandHandler';
import { AuthModule } from './Auth/AuthModule';
import { CreateVoucherAction } from './House/Action/CreateVoucherAction';
import { CanCreateVoucher } from 'src/Domain/House/CanCreateVoucher';
import { CreateVoucherCommandHandler } from 'src/Application/House/Command/CreateVoucherCommandHandler';
import { CodeGeneratorAdapter } from './Adapter/CodeGeneratorAdapter';
import { MailerAdapter } from './Adapter/MailerAdapter';
import { VoucherRepository } from './House/Repository/VoucherRepository';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([House, Voucher])],
  controllers: [CreateHouseAction, CreateVoucherAction],
  providers: [
    { provide: 'IHouseRepository', useClass: HouseRepository },
    { provide: 'IVoucherRepository', useClass: VoucherRepository },
    { provide: 'ICodeGeneratorAdapter', useClass: CodeGeneratorAdapter },
    { provide: 'IMailerAdapter', useClass: MailerAdapter },
    CreateHouseCommandHandler,
    CreateVoucherCommandHandler,
    CanCreateVoucher,
  ],
})
export class HouseModule {}

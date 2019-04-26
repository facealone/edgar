import 'dotenv/config';
import { CreateVoucherCommand } from './CreateVoucherCommand';
import { CommandHandler } from '@nestjs/cqrs';
import { CanCreateVoucher } from 'src/Domain/House/CanCreateVoucher';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { Inject, BadRequestException } from '@nestjs/common';
import { ICodeGeneratorAdapter } from 'src/Application/Adapter/ICodeGeneratorAdapter';
import { Mail } from 'src/Domain/Common/Mail/Mail';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';
import { House } from 'src/Domain/House/House.entity';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';

@CommandHandler(CreateVoucherCommand)
export class CreateVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    @Inject('IHouseRepository')
    private readonly houseRepository: IHouseRepository,
    @Inject('IMailerAdapter')
    private readonly mailAdapter: IMailerAdapter,
    @Inject('ICodeGeneratorAdapter')
    private readonly codeGeneratorAdapter: ICodeGeneratorAdapter,
    private readonly canCreateVoucher: CanCreateVoucher,
  ) {}

  execute = async (command: CreateVoucherCommand): Promise<Voucher> => {
    const { user, email, role } = command;

    const house = await this.houseRepository.find(command.house);
    if (!(house instanceof House)) {
      throw new BadRequestException('voucher.house.not_found');
    }

    if (false === (await this.canCreateVoucher.isSatisfiedBy(house, email))) {
      throw new BadRequestException('voucher.already.generated');
    }

    const voucher = await this.voucherRepository.save(
      new Voucher({
        user,
        email,
        role,
        code: this.codeGeneratorAdapter.generate(),
        house,
      }),
    );

    this.mailAdapter.send(
      new Mail(command.email, process.env.SENDGRID_TEMPLATE_VOUCHER, {
        code: voucher.code,
        firstName: user.firstName,
        lastName: user.lastName,
        house: house.name,
      }),
    );

    return voucher;
  };
}

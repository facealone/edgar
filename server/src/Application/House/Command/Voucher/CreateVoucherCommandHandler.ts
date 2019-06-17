import { CreateVoucherCommand } from './CreateVoucherCommand';
import { CommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { ICodeGeneratorAdapter } from 'src/Application/Adapter/ICodeGeneratorAdapter';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';
import { House } from 'src/Domain/House/House.entity';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { VoucherView } from '../../View/Voucher/VoucherView';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';

@CommandHandler(CreateVoucherCommand)
export class CreateVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    @Inject('IHouseRepository')
    private readonly houseRepository: IHouseRepository,
    @Inject('ICodeGeneratorAdapter')
    private readonly codeGeneratorAdapter: ICodeGeneratorAdapter,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    command: CreateVoucherCommand,
  ): Promise<VoucherView> => {
    const { user, houseId, role } = command;
    const house = await this.houseRepository.find(houseId);

    if (!(house instanceof House)) {
      throw new BadRequestException('house.not.found');
    }

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new BadRequestException();
    }

    const voucher = await this.voucherRepository.save(
      new Voucher({
        user,
        role,
        code: this.codeGeneratorAdapter.generate(),
        house,
      }),
    );

    return new VoucherView(voucher.code, voucher.role);
  };
}

import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConsumeVoucherCommand } from './ConsumeVoucherCommand';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { UpdateCurrentHouseCommand } from 'src/Application/User/Command/UpdateCurrentHouseCommand';
import { CreateUserHouseCommand } from 'src/Application/User/Command/CreateUserHouseCommand';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { CanConsumeVoucher } from 'src/Domain/House/CanConsumeVoucher';

@CommandHandler(ConsumeVoucherCommand)
export class ConsumeVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    private readonly canConsumeVoucher: CanConsumeVoucher,
  ) {}

  public execute = async (command: ConsumeVoucherCommand): Promise<void> => {
    const { user, code } = command;

    const voucher = await this.voucherRepository.findOneByCode(code);
    if (!(voucher instanceof Voucher)) {
      throw new NotFoundException('house.voucher.not_found');
    }

    if (false === (await this.canConsumeVoucher.isSatisfiedBy(voucher, user))) {
      throw new BadRequestException('house.cannot.consume.voucher');
    }

    const userHouse = await this.commandBus.execute(
      new CreateUserHouseCommand(user, voucher.house, voucher.role),
    );

    if (!(userHouse instanceof UserHouse)) {
      throw new BadRequestException();
    }

    await this.commandBus.execute(
      new UpdateCurrentHouseCommand(userHouse.user, userHouse.house),
    );

    await this.voucherRepository.remove(voucher);
  };
}

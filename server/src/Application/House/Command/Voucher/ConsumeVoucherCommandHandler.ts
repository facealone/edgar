import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConsumeVoucherCommand } from './ConsumeVoucherCommand';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { UpdateCurrentHouseCommand } from 'src/Application/User/Command/UpdateCurrentHouseCommand';
import { CreateUserHouseCommand } from 'src/Application/User/Command/CreateUserHouseCommand';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';

@CommandHandler(ConsumeVoucherCommand)
export class ConsumeVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: ConsumeVoucherCommand): Promise<void> => {
    const { user, code } = command;

    const voucher = await this.voucherRepository.findOneByCode(code);
    if (!(voucher instanceof Voucher)) {
      throw new NotFoundException('house.voucher.not_found');
    }

    const { house, role } = voucher;

    if (true === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new BadRequestException('house.user.already.member');
    }

    const userHouse = await this.commandBus.execute(
      new CreateUserHouseCommand(user, house, role),
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
import { Controller, UseGuards, Param, Inject, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConsumeVoucherCommand } from 'src/Application/House/Command/Voucher/ConsumeVoucherCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';

@Controller('vouchers')
@ApiUseTags('Voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ConsumeVoucherAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Consume voucher by notified user to join a house',
  })
  @Delete('/:code/consume')
  public async index(
    @Param() command: ConsumeVoucherCommand,
    @LoggedUser() user: User,
  ) {
    command.user = user;

    await this.commandBus.execute(command);
  }
}

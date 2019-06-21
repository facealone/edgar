import { Controller, UseGuards, Param, Inject, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConsumeVoucherCommand } from 'src/Application/House/Command/Voucher/ConsumeVoucherCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { HouseView } from 'src/Application/House/View/HouseView';

@Controller('vouchers')
@ApiUseTags('Voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ConsumeVoucherController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Consume voucher to join a house by logged user',
  })
  @Put('/:code/consume')
  public async index(
    @Param() command: ConsumeVoucherCommand,
    @LoggedUser() user: User,
  ): Promise<HouseView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

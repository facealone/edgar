import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { CreateVoucherCommand } from 'src/Application/House/Command/Voucher/CreateVoucherCommand';
import { VoucherView } from 'src/Application/House/View/Voucher/VoucherView';

@Controller('vouchers')
@ApiUseTags('Voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CreateVoucherController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Create voucher for the current house of the the logged user',
  })
  @Post()
  public async index(
    @Body() command: CreateVoucherCommand,
    @LoggedUser() user: User,
  ): Promise<VoucherView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { CreateVoucherCommand } from 'src/Application/House/Command/CreateVoucherCommand';
import { Voucher } from 'src/Domain/House/Voucher.entity';

@Controller('vouchers')
@ApiUseTags('Voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CreateVoucherAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  @ApiOperation({
    title: 'Create voucher and send notification to invited user',
  })
  async index(
    @Body() command: CreateVoucherCommand,
    @LoggedUser() user: User,
  ): Promise<object> {
    command.user = user;
    const voucher = await this.commandBus.execute(command);

    if (!(voucher instanceof Voucher)) {
      throw new BadRequestException('voucher.not.found');
    }

    return {
      id: voucher.id,
    };
  }
}

import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Body,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetTransactionByIdQuery } from 'src/Application/Budget/Query/GetTransactionByIdQuery';
import { UpdateTransactionCommand } from 'src/Application/Budget/Command/UpdateTransactionCommand';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';

@ApiBearerAuth()
@Controller()
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class UpdateTransactionController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Update transaction by the logged user',
  })
  @Put('transactions/:id')
  public async index(
    @Param() query: GetTransactionByIdQuery,
    @Body() command: UpdateTransactionCommand,
    @LoggedUser() user: User,
  ) {
    const transaction = await this.queryBus.execute(query);
    if (!(transaction instanceof Transaction)) {
      throw new NotFoundException();
    }

    command.user = user;
    command.transaction = transaction;

    return this.commandBus.execute(command);
  }
}

import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { GetTransactionByIdQuery } from 'src/Application/Budget/Query/Transaction/GetTransactionByIdQuery';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { RemoveTransactionCommand } from 'src/Application/Budget/Command/Transaction/RemoveTransactionCommand';

@ApiBearerAuth()
@Controller()
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class RemoveTransactionController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Remove transaction by the logged user',
  })
  @Delete('transactions/:id')
  public async index(
    @Param() query: GetTransactionByIdQuery,
    @LoggedUser() user: User,
  ) {
    const transaction = await this.queryBus.execute(query);
    if (!(transaction instanceof Transaction)) {
      throw new NotFoundException();
    }

    this.commandBus.execute(new RemoveTransactionCommand(user, transaction));
  }
}

import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetTransactionsByBudgetQuery } from 'src/Application/Budget/Query/Transaction/GetTransactionsByBudgetQuery';
import { TransactionListView } from 'src/Application/Budget/View/TransactionListView';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { GetBudgetByIdQuery } from 'src/Application/Budget/Query/GetBudgetByIdQuery';
import { TransactionFiltersDto } from '../Dto/TransactionFiltersDto';

@ApiBearerAuth()
@Controller()
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class GetTransactionsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get transactions of the logged user current house',
  })
  @Get('budgets/:id/transactions')
  public async index(
    @LoggedUser() user: User,
    @Param() query: GetBudgetByIdQuery,
    @Query() filters: TransactionFiltersDto,
  ): Promise<TransactionListView> {
    query.user = user;

    const budget = await this.queryBus.execute(query);
    if (!(budget instanceof Budget)) {
      throw new NotFoundException();
    }

    return this.queryBus.execute(
      new GetTransactionsByBudgetQuery(user, budget, filters),
    );
  }
}

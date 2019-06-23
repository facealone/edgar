import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, UseGuards, Get, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { TransactionCategoryView } from 'src/Application/Budget/View/TransactionCategoryView';
import { GetTransactionsCategoriesQuery } from 'src/Application/Budget/Query/GetTransactionsCategoriesQuery';

@ApiBearerAuth()
@Controller('transactions-categories')
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class GetTransactionsCategoriesController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get transaction categories' })
  @Get()
  public index(): TransactionCategoryView[] {
    return this.queryBus.execute(new GetTransactionsCategoriesQuery());
  }
}

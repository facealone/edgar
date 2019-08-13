import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Inject, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetShoppingListSuggestionsQuery } from 'src/Application/Shop/Query/ShoppingList/GetShoppingListSuggestionsQuery';
import { ShoppingListSuggestionView } from 'src/Application/Shop/View/ShoppingListSuggestionView';

@ApiBearerAuth()
@Controller('shopping-list-suggestions')
@ApiUseTags('Shop')
@UseGuards(AuthGuard())
export class GetShoppingListSuggestionsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get shopping list suggestions' })
  @Get()
  public async index(
    @Query() query: GetShoppingListSuggestionsQuery,
  ): Promise<ShoppingListSuggestionView[]> {
    return await this.queryBus.execute(query);
  }
}

import { Controller, UseGuards, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { RecipeCategoryView } from 'src/Application/Recipe/View/RecipeCategoryView';
import { GetRecipesCategoriesQuery } from 'src/Application/Recipe/Query/GetRecipesCategoriesQuery';

@ApiBearerAuth()
@Controller('recipes-categories')
@ApiUseTags('Recipe')
@UseGuards(AuthGuard())
export class GetRecipeCategoriesController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get recipe categories' })
  @Get()
  public async index(): Promise<RecipeCategoryView[]> {
    return await this.queryBus.execute(new GetRecipesCategoriesQuery());
  }
}

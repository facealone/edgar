import {
  Controller,
  UseGuards,
  Get,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetRecipesByHouseQuery } from 'src/Application/Recipe/Query/GetRecipesByHouseQuery';
import { RecipeView } from 'src/Application/Recipe/View/RecipeView';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('users/me/current-house')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetRecipesController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get recipes of the logged user current house' })
  @Get('/recipes')
  public async index(@LoggedUser() user: User): Promise<RecipeView[]> {
    if (!user.currentHouse) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(new GetRecipesByHouseQuery(user));
  }
}

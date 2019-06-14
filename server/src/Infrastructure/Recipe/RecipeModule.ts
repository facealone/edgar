import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { Recipe } from 'src/Domain/Recipe/Recipe.entity';
import { CreateRecipeController } from './Controller/CreateRecipeController';
import { RecipeRepository } from './Repository/RecipeRepository';
import { CreateRecipeCommandHandler } from 'src/Application/Recipe/Command/CreateRecipeCommandHandler';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { GetRecipesController } from './Controller/GetRecipesController';
import { GetRecipesByHouseQueryHandler } from 'src/Application/Recipe/Query/GetRecipesByHouseQueryHandler';
import { RemoveRecipeCommandHandler } from 'src/Application/Recipe/Command/RemoveRecipeCommandHandler';
import { RemoveRecipeController } from './Controller/RemoveRecipeController';
import { RecipeCategoryRepository } from './Repository/RecipeCategoryRepository';
import { RecipeCategory } from 'src/Domain/Recipe/RecipeCategory.entity';
import { GetRecipeCategoriesController } from './Controller/GetRecipeCategoriesController';
import { GetRecipesCategoriesQueryHandler } from 'src/Application/Recipe/Query/GetRecipesCategoriesQueryHandler';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Recipe, RecipeCategory, UserHouse]),
  ],
  controllers: [
    CreateRecipeController,
    GetRecipesController,
    GetRecipeCategoriesController,
    RemoveRecipeController,
  ],
  providers: [
    { provide: 'IRecipeRepository', useClass: RecipeRepository },
    {
      provide: 'IRecipeCategoryRepository',
      useClass: RecipeCategoryRepository,
    },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    CreateRecipeCommandHandler,
    GetRecipesByHouseQueryHandler,
    RemoveRecipeCommandHandler,
    GetRecipesCategoriesQueryHandler,
    IsMemberOfHouse,
  ],
})
export class RecipeModule {}

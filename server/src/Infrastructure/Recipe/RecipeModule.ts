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

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Recipe, UserHouse]),
  ],
  controllers: [
    CreateRecipeController,
    GetRecipesController,
    RemoveRecipeController,
  ],
  providers: [
    { provide: 'IRecipeRepository', useClass: RecipeRepository },
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    CreateRecipeCommandHandler,
    GetRecipesByHouseQueryHandler,
    RemoveRecipeCommandHandler,
    IsMemberOfHouse,
  ],
})
export class RecipeModule {}

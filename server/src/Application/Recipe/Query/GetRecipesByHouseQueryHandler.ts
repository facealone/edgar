import { QueryHandler } from '@nestjs/cqrs';
import { GetRecipesByHouseQuery } from './GetRecipesByHouseQuery';
import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { RecipeView } from '../View/RecipeView';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { RecipeCategoryView } from '../View/RecipeCategoryView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetRecipesByHouseQuery)
export class GetRecipesByHouseQueryHandler {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetRecipesByHouseQuery,
  ): Promise<Pagination<RecipeView>> => {
    const { user } = query;
    const house = user.currentHouse;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const [recipes, total] = await this.recipeRepository.findByHouse(house, 1);
    const recipeViews = [];

    for (const recipe of recipes) {
      recipeViews.push(
        new RecipeView(
          recipe.id,
          recipe.name,
          recipe.uri,
          new OwnerView(recipe.owner.firstName, recipe.owner.lastName),
          new RecipeCategoryView(recipe.category.id, recipe.category.name),
        ),
      );
    }

    return new Pagination<RecipeView>(recipeViews, total);
  };
}

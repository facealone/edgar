import { QueryHandler } from '@nestjs/cqrs';
import { GetRecipesByHouseQuery } from './GetRecipesByHouseQuery';
import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { RecipeView } from '../View/RecipeView';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { RecipeCategoryView } from '../View/RecipeCategoryView';

@QueryHandler(GetRecipesByHouseQuery)
export class GetRecipesByHouseQueryHandler {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetRecipesByHouseQuery,
  ): Promise<RecipeView[]> => {
    const { house, user } = query;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const recipes = await this.recipeRepository.findByHouse(house);
    const recipeViews = [];

    for (const recipe of recipes) {
      const { owner, category } = recipe;

      recipeViews.push(
        new RecipeView(
          recipe.id,
          recipe.name,
          recipe.uri,
          new OwnerView(owner.firstName, owner.lastName),
          new RecipeCategoryView(category.id, category.name),
        ),
      );
    }

    return recipeViews;
  };
}

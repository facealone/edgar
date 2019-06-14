import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRecipesCategoriesQuery } from './GetRecipesCategoriesQuery';
import { IRecipeCategoryRepository } from 'src/Domain/Recipe/Repository/IRecipeCategoryRepository';
import { RecipeCategoryView } from '../View/RecipeCategoryView';

@QueryHandler(GetRecipesCategoriesQuery)
export class GetRecipesCategoriesQueryHandler {
  constructor(
    @Inject('IRecipeCategoryRepository')
    private readonly recipeCategoryRepository: IRecipeCategoryRepository,
  ) {}

  public execute = async (
    query: GetRecipesCategoriesQuery,
  ): Promise<RecipeCategoryView[]> => {
    const recipeCategories = await this.recipeCategoryRepository.findAll();
    const recipeCategoriesViews = [];

    for (const recipeCategory of recipeCategories) {
      recipeCategoriesViews.push(
        new RecipeCategoryView(recipeCategory.id, recipeCategory.name),
      );
    }

    return recipeCategoriesViews;
  };
}

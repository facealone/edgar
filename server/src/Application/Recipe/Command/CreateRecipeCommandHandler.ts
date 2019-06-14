import { CommandHandler } from '@nestjs/cqrs';
import { CreateRecipeCommand } from './CreateRecipeCommand';
import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import {
  Inject,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Recipe } from 'src/Domain/Recipe/Recipe.entity';
import { RecipeView } from '../View/RecipeView';
import { House } from 'src/Domain/House/House.entity';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { IRecipeCategoryRepository } from 'src/Domain/Recipe/Repository/IRecipeCategoryRepository';
import { RecipeCategory } from 'src/Domain/Recipe/RecipeCategory.entity';
import { RecipeCategoryView } from '../View/RecipeCategoryView';

@CommandHandler(CreateRecipeCommand)
export class CreateRecipeCommandHandler {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    @Inject('IRecipeCategoryRepository')
    private readonly recipeCateogryRepository: IRecipeCategoryRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    command: CreateRecipeCommand,
  ): Promise<RecipeView> => {
    const { name, uri, user, recipeCategory } = command;
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException('user.empty.current_house');
    }

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const category = await this.recipeCateogryRepository.findOneById(
      recipeCategory,
    );
    if (!(category instanceof RecipeCategory)) {
      throw new BadRequestException('recipe.category.not.found');
    }

    const recipe = await this.recipeRepository.save(
      new Recipe({ name, uri, house, owner: user, category }),
    );

    return new RecipeView(
      recipe.id,
      recipe.name,
      recipe.uri,
      new OwnerView(user.firstName, user.lastName),
      new RecipeCategoryView(category.id, category.name),
    );
  };
}

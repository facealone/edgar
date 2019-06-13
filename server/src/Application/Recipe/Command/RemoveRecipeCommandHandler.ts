import { CommandHandler } from '@nestjs/cqrs';
import { RemoveRecipeCommand } from './RemoveRecipeCommand';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import { Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Recipe } from 'src/Domain/Recipe/Recipe.entity';

@CommandHandler(RemoveRecipeCommand)
export class RemoveRecipeCommandHandler {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (command: RemoveRecipeCommand): Promise<void> => {
    const { id, user } = command;

    const recipe = await this.recipeRepository.findOneById(id);
    if (!(recipe instanceof Recipe)) {
      throw new NotFoundException('recipe.not.found');
    }

    if (
      false === (await this.isMemberOfHouse.isSatisfiedBy(recipe.house, user))
    ) {
      throw new ForbiddenException();
    }

    this.recipeRepository.remove(recipe);
  };
}

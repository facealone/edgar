import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/Domain/Recipe/Recipe.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
  ) {}

  public save = async (recipe: Recipe): Promise<Recipe> => {
    return await this.repository.save(recipe);
  };

  public findByHouse = async (house: House): Promise<Recipe[]> => {
    return await this.repository.find({
      where: { house },
      order: { createdAt: 'DESC' },
      relations: ['owner', 'category'],
    });
  };

  public findOneById = async (id: string): Promise<Recipe | null> => {
    return await this.repository.findOne({
      where: { id },
      relations: ['house'],
    });
  };

  public remove = async (recipe: Recipe): Promise<void> => {
    await this.repository.remove(recipe);
  };
}

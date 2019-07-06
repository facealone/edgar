import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IRecipeRepository } from 'src/Domain/Recipe/Repository/IRecipeRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/Domain/Recipe/Recipe.entity';
import { House } from 'src/Domain/House/House.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
  ) {}

  public save = async (recipe: Recipe): Promise<Recipe> => {
    return await this.repository.save(recipe);
  };

  public findByHouse = async (
    house: House,
    page: number = 1,
  ): Promise<[Recipe[], number]> => {
    return await this.repository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.name',
        'recipe.uri',
        'user.firstName',
        'user.lastName',
        'category.id',
        'category.name',
      ])
      .where('recipe.house = :id', { id: house.id })
      .innerJoin('recipe.owner', 'user')
      .innerJoin('recipe.category', 'category')
      .orderBy('recipe.createdAt', 'DESC')
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };

  public findOneById = async (id: string): Promise<Recipe | null> => {
    return await this.repository
      .createQueryBuilder('recipe')
      .select(['recipe.id', 'house.id'])
      .where('recipe.id = :id', { id })
      .innerJoin('recipe.house', 'house')
      .getOne();
  };

  public remove = (recipe: Recipe): void => {
    this.repository.remove(recipe);
  };
}

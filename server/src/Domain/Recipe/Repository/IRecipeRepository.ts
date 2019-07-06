import { Recipe } from '../Recipe.entity';
import { House } from 'src/Domain/House/House.entity';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findByHouse(house: House, page: number): Promise<[Recipe[], number]>;
  findOneById(id: string): Promise<Recipe | null>;
  remove(recipe: Recipe): void;
}

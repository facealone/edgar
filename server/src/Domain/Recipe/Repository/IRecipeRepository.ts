import { Recipe } from '../Recipe.entity';
import { House } from 'src/Domain/House/House.entity';
import { RecipeFiltersDto } from 'src/Infrastructure/Recipe/Controller/Dto/RecipeFiltersDto';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findByHouse(
    house: House,
    filters: RecipeFiltersDto,
  ): Promise<[Recipe[], number]>;
  findOneById(id: string): Promise<Recipe | null>;
  remove(recipe: Recipe): void;
}

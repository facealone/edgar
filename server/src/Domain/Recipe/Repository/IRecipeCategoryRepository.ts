import { RecipeCategory } from '../RecipeCategory.entity';

export interface IRecipeCategoryRepository {
  findAll(): Promise<RecipeCategory[]>;
}

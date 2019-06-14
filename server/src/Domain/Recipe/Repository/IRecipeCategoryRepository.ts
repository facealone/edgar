import { RecipeCategory } from '../RecipeCategory.entity';

export interface IRecipeCategoryRepository {
  findAll(): Promise<RecipeCategory[]>;
  findOneById(id: string): Promise<RecipeCategory | null>;
}

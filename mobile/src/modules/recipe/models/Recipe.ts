import { Owner } from '../../user/models/Owner';
import { RecipeCategory } from './RecipeCategory';

export class Recipe {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uri: string,
    public readonly owner: Owner,
    public readonly category: RecipeCategory,
  ) {}
}

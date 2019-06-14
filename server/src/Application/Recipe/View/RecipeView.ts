import { OwnerView } from 'src/Application/User/View/OwnerView';
import { RecipeCategoryView } from './RecipeCategoryView';

export class RecipeView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uri: string,
    public readonly owner: OwnerView,
    public readonly category: RecipeCategoryView,
  ) {}
}

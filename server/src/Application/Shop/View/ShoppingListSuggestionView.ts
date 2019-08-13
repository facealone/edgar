import { ShoppingListCategoryView } from './ShoppingListCategoryView';

export class ShoppingListSuggestionView {
  constructor(
    public name: string,
    public category?: ShoppingListCategoryView,
  ) {}
}

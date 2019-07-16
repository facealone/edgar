import { ShoppingListSuggestion } from '../ShoppingListSuggestion.entity';

export interface IShoppingListSuggestionRepository {
  findAll(): Promise<ShoppingListSuggestion[]>;
}

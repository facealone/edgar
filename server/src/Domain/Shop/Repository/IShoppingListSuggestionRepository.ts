import { ShoppingListSuggestion } from '../ShoppingListSuggestion.entity';

export interface IShoppingListSuggestionRepository {
  findAll(): Promise<ShoppingListSuggestion[]>;
  findByName(name: string): Promise<ShoppingListSuggestion[]>;
}

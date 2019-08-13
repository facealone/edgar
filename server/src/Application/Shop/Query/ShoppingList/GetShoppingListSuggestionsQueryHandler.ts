import { QueryHandler } from '@nestjs/cqrs';
import { GetShoppingListSuggestionsQuery } from './GetShoppingListSuggestionsQuery';
import { IShoppingListSuggestionRepository } from 'src/Domain/Shop/Repository/IShoppingListSuggestionRepository';
import { Inject } from '@nestjs/common';
import { ShoppingListSuggestionView } from '../../View/ShoppingListSuggestionView';
import { ShoppingListCategoryView } from '../../View/ShoppingListCategoryView';

@QueryHandler(GetShoppingListSuggestionsQuery)
export class GetShoppingListSuggestionsQueryHandler {
  constructor(
    @Inject('IShoppingListSuggestionRepository')
    private readonly shoppingListSuggestionRepository: IShoppingListSuggestionRepository,
  ) {}

  public execute = async (query: GetShoppingListSuggestionsQuery) => {
    const shoppingListSuggestionsViews = [];
    const shoppingListSuggestions = await this.shoppingListSuggestionRepository.findByName(
      query.name,
    );

    for (const shoppingListSuggestion of shoppingListSuggestions) {
      const category = shoppingListSuggestion.shoppingListCategory;

      shoppingListSuggestionsViews.push(
        new ShoppingListSuggestionView(
          shoppingListSuggestion.name,
          new ShoppingListCategoryView(category.id, category.name),
        ),
      );
    }

    shoppingListSuggestionsViews.push(
      new ShoppingListSuggestionView(query.name),
    );

    return shoppingListSuggestionsViews;
  };
}

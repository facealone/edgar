import { client } from './Client';
import { ApiResponse } from '@elastic/elasticsearch';
import { ShoppingSuggestionMapping } from './Config/ShoppingSuggestionMapping';

export class IndexBuilder {
  public static readonly SHOPPING_SUGGESTION: string = 'shopping_suggestion';

  public createIndex = async (): Promise<void> => {
    await client.indices.create({
      index: IndexBuilder.SHOPPING_SUGGESTION,
      body: ShoppingSuggestionMapping,
    });
  };

  public getIndex = (): Promise<ApiResponse> => {
    return client.indices.get({
      index: IndexBuilder.SHOPPING_SUGGESTION,
    });
  };
}

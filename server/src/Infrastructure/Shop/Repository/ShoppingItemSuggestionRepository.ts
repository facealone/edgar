import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingListSuggestion } from 'src/Domain/Shop/ShoppingListSuggestion.entity';
import { IShoppingListSuggestionRepository } from 'src/Domain/Shop/Repository/IShoppingListSuggestionRepository';

@Injectable()
export class ShoppingListSuggestionRepository
  implements IShoppingListSuggestionRepository {
  constructor(
    @InjectRepository(ShoppingListSuggestion)
    private readonly repository: Repository<ShoppingListSuggestion>,
  ) {}

  public findAll = async (): Promise<ShoppingListSuggestion[]> => {
    return await this.repository.find();
  };
}

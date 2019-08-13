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

  public findByName = (name: string): Promise<ShoppingListSuggestion[]> => {
    return this.repository
      .createQueryBuilder('shoppingListSuggestion')
      .select([
        'shoppingListSuggestion.name',
        'shoppingListCategory.id',
        'shoppingListCategory.name',
      ])
      .where('LOWER(shoppingListSuggestion.name) like LOWER(:name)', {
        name: `%${name}%`,
      })
      .innerJoin(
        'shoppingListSuggestion.shoppingListCategory',
        'shoppingListCategory',
      )
      .orderBy('shoppingListCategory.position', 'ASC')
      .addOrderBy('shoppingListSuggestion.name', 'ASC')
      .limit(20)
      .getMany();
  };
}

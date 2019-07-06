import { QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsCategoriesQuery } from './GetTransactionsCategoriesQuery';
import { ITransactionCategoryRepository } from 'src/Domain/Budget/Repository/ITransactionCategoryRepository';
import { Inject } from '@nestjs/common';
import { TransactionCategoryView } from '../../View/TransactionCategoryView';

@QueryHandler(GetTransactionsCategoriesQuery)
export class GetTransactionsCategoriesQueryHandler {
  constructor(
    @Inject('ITransactionCategoryRepository')
    private readonly transactionCategoryRepository: ITransactionCategoryRepository,
  ) {}

  public execute = async (
    query: GetTransactionsCategoriesQuery,
  ): Promise<TransactionCategoryView[]> => {
    const categories = await this.transactionCategoryRepository.findAll();
    const categoriesViews = [];

    for (const category of categories) {
      categoriesViews.push(
        new TransactionCategoryView(category.id, category.name),
      );
    }

    return categoriesViews;
  };
}

import { QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsByBudgetQuery } from './GetTransactionsByBudgetQuery';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { TransactionView } from '../../View/TransactionView';
import { TransactionListView } from '../../View/TransactionListView';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { TransactionCategoryView } from '../../View/TransactionCategoryView';

@QueryHandler(GetTransactionsByBudgetQuery)
export class GetTransactionsByBudgetQueryHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    query: GetTransactionsByBudgetQuery,
  ): Promise<TransactionListView> => {
    const { budget, user, filters } = query;

    if (
      false === (await this.isOwnerOfHouse.isSatisfiedBy(budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const transactionsViews = [];
    const [
      transactions,
      expenses,
      total,
    ] = await this.transactionRepository.findByBudget(budget, filters);

    for (const transaction of transactions) {
      transactionsViews.push(
        new TransactionView(
          transaction.id,
          transaction.name,
          transaction.amount / 100,
          transaction.note,
          transaction.createdAt,
          new TransactionCategoryView(
            transaction.category.id,
            transaction.category.name,
          ),
          new OwnerView(transaction.user.firstName, transaction.user.lastName),
        ),
      );
    }

    return new TransactionListView(
      budget.amount / 100,
      Number(expenses.sum) / 100,
      transactionsViews,
      total,
    );
  };
}

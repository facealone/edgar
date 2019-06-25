import { QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsByBudgetQuery } from './GetTransactionsByBudgetQuery';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { TransactionView } from '../View/TransactionView';
import { TransactionListView } from '../View/TransactionListView';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { TransactionType } from 'src/Domain/Budget/Transaction.entity';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { TransactionCategoryView } from '../View/TransactionCategoryView';

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
    const { budget, user } = query;

    if (
      false === (await this.isOwnerOfHouse.isSatisfiedBy(budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const transactions = await this.transactionRepository.findByBudget(budget);
    const transactionsViews = [];

    let totalCashInflow: number = 0;
    let totalCashOutlay: number = 0;

    for (const transaction of transactions) {
      const { user, category } = transaction;

      if (TransactionType.CASH_INFLOW === transaction.type) {
        totalCashInflow += transaction.amount;
      } else {
        totalCashOutlay += transaction.amount;
      }

      transactionsViews.push(
        new TransactionView(
          transaction.id,
          transaction.name,
          transaction.type,
          transaction.amount / 100,
          transaction.note,
          transaction.createdAt,
          new TransactionCategoryView(category.id, category.name),
          new OwnerView(user.firstName, user.lastName),
        ),
      );
    }

    const balance = (budget.amount + totalCashInflow - totalCashOutlay) / 100;

    return new TransactionListView(
      totalCashInflow / 100,
      totalCashOutlay / 100,
      balance,
      budget.amount / 100,
      transactionsViews,
    );
  };
}

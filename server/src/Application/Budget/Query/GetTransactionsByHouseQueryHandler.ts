import { QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsByHouseQuery } from './GetTransactionsByHouseQuery';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { TransactionView } from '../View/TransactionView';
import { TransactionListView } from '../View/TransactionViewListView';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { TransactionCategoryView } from '../View/TransactionCategoryView';
import { TransactionType } from 'src/Domain/Budget/Transaction.entity';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';

@QueryHandler(GetTransactionsByHouseQuery)
export class GetTransactionsByHouseQueryHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    query: GetTransactionsByHouseQuery,
  ): Promise<TransactionListView> => {
    const { house, user } = query;

    if (false === (await this.isOwnerOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const transactions = await this.transactionRepository.findByHouse(house);
    const transactionsViews = [];

    let cashInflow: number = 0;
    let cashOutlay: number = 0;

    for (const transaction of transactions) {
      const { category, user } = transaction;

      if (TransactionType.CASH_INFLOW === transaction.type) {
        cashInflow += transaction.amount;
      } else {
        cashOutlay += transaction.amount;
      }

      transactionsViews.push(
        new TransactionView(
          transaction.id,
          transaction.name,
          transaction.type,
          transaction.amount / 100,
          transaction.note,
          transaction.createdAt,
          new OwnerView(user.firstName, user.lastName),
          new TransactionCategoryView(
            category.id,
            category.name,
            category.icon,
          ),
        ),
      );
    }

    return new TransactionListView(
      cashInflow / 100,
      cashOutlay / 100,
      (cashInflow - cashOutlay) / 100,
      transactionsViews,
    );
  };
}

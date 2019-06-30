import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { House } from 'src/Domain/House/House.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { User } from 'src/Domain/User/User.entity';

@Injectable()
export class BudgetRepository implements IBudgetRepository {
  constructor(
    @InjectRepository(Budget)
    private readonly repository: Repository<Budget>,
  ) {}

  public save = async (budget: Budget): Promise<Budget> => {
    return await this.repository.save(budget);
  };

  public findOneByIdAndUser = async (
    id: string,
    user: User,
  ): Promise<Budget | null> => {
    return await this.repository
      .createQueryBuilder('budget')
      .where(
        'budget.id = :id AND (budget.shared = true OR (budget.shared = false AND user.id = :user))',
        { id, user: user.id },
      )
      .innerJoinAndSelect('budget.house', 'house')
      .innerJoin('budget.user', 'user')
      .getOne();
  };

  public findByHouseAndUser = async (
    house: House,
    user: User,
    date: Date,
  ): Promise<any[]> => {
    return await this.repository
      .createQueryBuilder('budget')
      .select('budget.id, budget.name, budget.amount, budget.shared')
      .addSelect(subQuery => {
        return this.sumOfTransactionAmountQuery(subQuery, date, 'cash_inflow');
      }, 'totalCashInflow')
      .addSelect(subQuery => {
        return this.sumOfTransactionAmountQuery(subQuery, date, 'cash_outlay');
      }, 'totalCashOutlay')
      .innerJoin('budget.user', 'user')
      .where(
        'budget.house = :house AND (budget.shared = true OR (budget.shared = false AND user.id = :user))',
        { house: house.id, user: user.id },
      )
      .orderBy('budget.createdAt', 'DESC')
      .groupBy('budget.id, user.id')
      .getRawMany();
  };

  private sumOfTransactionAmountQuery = (
    subQuery: SelectQueryBuilder<Transaction>,
    date: Date,
    type: string,
  ) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return subQuery
      .select('SUM(transaction.amount)')
      .from(Transaction, 'transaction')
      .where('transaction.budget = budget.id')
      .andWhere('extract(month FROM transaction.createdAt ) = :month', {
        month,
      })
      .andWhere('extract(year FROM transaction.createdAt ) = :year', {
        year,
      })
      .andWhere("transaction.type = '" + type + "'");
  };
}

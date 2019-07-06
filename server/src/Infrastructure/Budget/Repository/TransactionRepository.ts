import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { TransactionFiltersDto } from '../Controller/Dto/TransactionFiltersDto';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  public save = async (transaction: Transaction): Promise<Transaction> => {
    return await this.repository.save(transaction);
  };

  public findByBudget = async (
    budget: Budget,
    filters: TransactionFiltersDto,
  ): Promise<[Transaction[], any, number]> => {
    const date = new Date(filters.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const baseQuery = this.repository
      .createQueryBuilder('transaction')
      .where('transaction.budget = :budget', { budget: budget.id })
      .andWhere('extract(month FROM transaction.createdAt ) = :month', {
        month,
      })
      .andWhere('extract(year FROM transaction.createdAt ) = :year', {
        year,
      });

    const total = baseQuery.select('transaction.id').getCount();
    const expenses = baseQuery.select('SUM(transaction.amount)').getRawOne();
    const transactions = baseQuery
      .select([
        'transaction.id',
        'transaction.name',
        'transaction.note',
        'transaction.amount',
        'transaction.createdAt',
        'user.firstName',
        'user.lastName',
        'category.id',
        'category.name',
      ])
      .innerJoin('transaction.user', 'user')
      .innerJoin('transaction.category', 'category')
      .orderBy('transaction.createdAt', 'DESC')
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getMany();

    return await Promise.all([transactions, expenses, total]);
  };

  public findOneById = async (id: string): Promise<Transaction | null> => {
    return await this.repository
      .createQueryBuilder('transaction')
      .where('transaction.id = :id', { id })
      .innerJoinAndSelect('transaction.budget', 'budget')
      .innerJoinAndSelect('budget.house', 'house')
      .getOne();
  };

  public remove = (transaction: Transaction): void => {
    this.repository.remove(transaction);
  };
}

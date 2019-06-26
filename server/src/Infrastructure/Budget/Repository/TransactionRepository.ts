import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Budget } from 'src/Domain/Budget/Budget.entity';

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
    date: Date,
  ): Promise<Transaction[]> => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return await this.repository
      .createQueryBuilder('transaction')
      .where('transaction.budget = :budget', { budget: budget.id })
      .andWhere('extract(month FROM transaction.createdAt ) = :month', {
        month,
      })
      .andWhere('extract(year FROM transaction.createdAt ) = :year', {
        year,
      })
      .innerJoinAndSelect('transaction.user', 'user')
      .innerJoinAndSelect('transaction.category', 'category')
      .orderBy('transaction.createdAt', 'DESC')
      .getMany();
  };
}

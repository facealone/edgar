import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  public save = async (transaction: Transaction): Promise<Transaction> => {
    return await this.repository.save(transaction);
  };
}

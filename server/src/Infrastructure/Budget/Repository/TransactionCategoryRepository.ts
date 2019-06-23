import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionCategoryRepository } from 'src/Domain/Budget/Repository/ITransactionCategoryRepository';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';

export class TransactionCategoryRepository
  implements ITransactionCategoryRepository {
  constructor(
    @InjectRepository(TransactionCategory)
    private readonly repository: Repository<TransactionCategory>,
  ) {}

  public findAll = async (): Promise<TransactionCategory[]> => {
    return await this.repository.find();
  };
}

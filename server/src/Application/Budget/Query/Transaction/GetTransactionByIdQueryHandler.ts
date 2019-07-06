import { QueryHandler } from '@nestjs/cqrs';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { Inject } from '@nestjs/common';
import { GetTransactionByIdQuery } from './GetTransactionByIdQuery';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';

@QueryHandler(GetTransactionByIdQuery)
export class GetTransactionByIdQueryHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public execute = async (
    query: GetTransactionByIdQuery,
  ): Promise<Transaction | null> => {
    return await this.transactionRepository.findOneById(query.id);
  };
}

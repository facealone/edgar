import { QueryHandler } from '@nestjs/cqrs';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { Inject } from '@nestjs/common';
import { GetBudgetByIdQuery } from './GetBudgetByIdQuery';
import { Budget } from 'src/Domain/Budget/Budget.entity';

@QueryHandler(GetBudgetByIdQuery)
export class GetBudgetByIdQueryHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  public execute = async (
    query: GetBudgetByIdQuery,
  ): Promise<Budget | null> => {
    return await this.budgetRepository.findOneById(query.id);
  };
}

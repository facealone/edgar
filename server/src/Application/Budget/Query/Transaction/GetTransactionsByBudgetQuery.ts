import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { TransactionFiltersDto } from 'src/Infrastructure/Budget/Controller/Dto/TransactionFiltersDto';

export class GetTransactionsByBudgetQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly budget: Budget,
    public readonly filters: TransactionFiltersDto,
  ) {}
}

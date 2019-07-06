import { IQuery } from 'src/Application/IQuery';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';
import { BudgetFiltersDto } from 'src/Infrastructure/Budget/Controller/Dto/BudgetFiltersDto';

export class GetBudgetsByHouseQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly house: House,
    public readonly filters: BudgetFiltersDto,
  ) {}
}

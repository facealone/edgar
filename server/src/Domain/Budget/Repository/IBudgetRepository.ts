import { House } from 'src/Domain/House/House.entity';
import { Budget } from '../Budget.entity';
import { User } from 'src/Domain/User/User.entity';
import { BudgetFiltersDto } from 'src/Infrastructure/Budget/Controller/Dto/BudgetFiltersDto';

export interface IBudgetRepository {
  save(budget: Budget): Promise<Budget>;
  findOneByIdAndUser(id: string, user: User): Promise<Budget | null>;
  findByHouseAndUser(
    house: House,
    user: User,
    filters: BudgetFiltersDto,
  ): Promise<[any[], number]>;
}

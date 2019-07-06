import { QueryHandler } from '@nestjs/cqrs';
import { GetBudgetsByHouseQuery } from './GetBudgetsByHouseQuery';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { BudgetView } from '../View/BudgetView';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetBudgetsByHouseQuery)
export class GetBudgetsByHouseQueryHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    query: GetBudgetsByHouseQuery,
  ): Promise<Pagination<BudgetView>> => {
    const { house, user, filters } = query;

    if (false === (await this.isOwnerOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const budgetsViews = [];
    const [budgets, total] = await this.budgetRepository.findByHouseAndUser(
      house,
      user,
      filters,
    );

    for (const budget of budgets) {
      let balance = budget.amount;

      if (budget.expenses > 0) {
        balance -= Number(budget.expenses);
      }

      budgetsViews.push(
        new BudgetView(
          budget.id,
          budget.name,
          budget.amount / 100,
          balance / 100,
          budget.shared,
        ),
      );
    }

    return new Pagination<BudgetView>(budgetsViews, total);
  };
}

import { QueryHandler } from '@nestjs/cqrs';
import { GetBudgetsByHouseQuery } from './GetBudgetsByHouseQuery';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { BudgetView } from '../View/BudgetView';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';

@QueryHandler(GetBudgetsByHouseQuery)
export class GetBudgetsByHouseQueryHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    query: GetBudgetsByHouseQuery,
  ): Promise<BudgetView[]> => {
    const { house, user } = query;

    if (false === (await this.isOwnerOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const budgets = await this.budgetRepository.findByHouse(house);
    const budgetsViews = [];

    for (const budget of budgets) {
      let balance = budget.amount;

      if (budget.totalCashInflow > 0) {
        balance += parseInt(budget.totalCashInflow);
      }

      if (budget.totalCashOutlay > 0) {
        balance -= parseInt(budget.totalCashOutlay);
      }

      budgetsViews.push(
        new BudgetView(
          budget.id,
          budget.name,
          budget.amount / 100,
          balance / 100,
        ),
      );
    }

    return budgetsViews;
  };
}

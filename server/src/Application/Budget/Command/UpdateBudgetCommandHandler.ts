import { CommandHandler } from '@nestjs/cqrs';
import { UpdateBudgetCommand } from './UpdateBudgetCommand';
import { Inject, ForbiddenException } from '@nestjs/common';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { BudgetView } from '../View/BudgetView';

@CommandHandler(UpdateBudgetCommand)
export class UpdateBudgetCommandHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    command: UpdateBudgetCommand,
  ): Promise<BudgetView> => {
    const { name, shared, user, amount, budget } = command;

    if (
      false === (await this.isOwnerOfHouse.isSatisfiedBy(budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    budget.update(name, Math.round(amount * 100), shared);

    await this.budgetRepository.save(budget);

    return new BudgetView(
      budget.id,
      budget.name,
      budget.amount / 100,
      0,
      budget.shared,
    );
  };
}

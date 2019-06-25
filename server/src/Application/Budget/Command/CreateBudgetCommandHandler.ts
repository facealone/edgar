import {
  Inject,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateBudgetCommand } from './CreateBudgetCommand';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { BudgetView } from '../View/BudgetView';
import { House } from 'src/Domain/House/House.entity';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';

@CommandHandler(CreateBudgetCommand)
export class CreateBudgetCommandHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    command: CreateBudgetCommand,
  ): Promise<BudgetView> => {
    const { name, shared, user } = command;
    const amount = command.amount * 100;
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException('user.empty.current_house');
    }

    if (false === (await this.isOwnerOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const budget = await this.budgetRepository.save(
      new Budget({
        name,
        shared,
        amount,
        user,
        house,
      }),
    );

    return new BudgetView(budget.id, budget.name, budget.shared);
  };
}

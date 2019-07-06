import {
  Inject,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './CreateTransactionCommand';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { TransactionView } from '../../View/TransactionView';
import { ITransactionCategoryRepository } from 'src/Domain/Budget/Repository/ITransactionCategoryRepository';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { TransactionCategoryView } from '../../View/TransactionCategoryView';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { Budget } from 'src/Domain/Budget/Budget.entity';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler {
  constructor(
    @Inject('IBudgetRepository')
    private readonly budgetRepository: IBudgetRepository,
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ITransactionCategoryRepository')
    private readonly transactionCategoryRepository: ITransactionCategoryRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    command: CreateTransactionCommand,
  ): Promise<TransactionView> => {
    const { name, note, categoryId, budgetId, user } = command;
    const amount = Math.round(command.amount * 100);

    const budget = await this.budgetRepository.findOneByIdAndUser(
      budgetId,
      user,
    );
    if (!(budget instanceof Budget)) {
      throw new BadRequestException('budget.not.found');
    }

    if (
      false === (await this.isOwnerOfHouse.isSatisfiedBy(budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const category = await this.transactionCategoryRepository.findOneById(
      categoryId,
    );
    if (!(category instanceof TransactionCategory)) {
      throw new BadRequestException('budget.category.not.found');
    }

    const transaction = await this.transactionRepository.save(
      new Transaction({
        name,
        amount,
        note,
        category,
        user,
        budget,
      }),
    );

    return new TransactionView(
      transaction.id,
      transaction.name,
      transaction.amount / 100,
      transaction.note,
      transaction.createdAt,
      new TransactionCategoryView(category.id, category.name),
      new OwnerView(user.firstName, user.lastName),
    );
  };
}

import {
  Inject,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { UpdateTransactionCommand } from './UpdateTransactionCommand';
import { ITransactionCategoryRepository } from 'src/Domain/Budget/Repository/ITransactionCategoryRepository';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { TransactionView } from '../View/TransactionView';
import { TransactionCategoryView } from '../View/TransactionCategoryView';
import { OwnerView } from 'src/Application/User/View/OwnerView';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionCommandHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ITransactionCategoryRepository')
    private readonly transactionCategoryRepository: ITransactionCategoryRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (command: UpdateTransactionCommand) => {
    const { transaction, user, amount, note, name, type, categoryId } = command;

    if (
      false ===
      (await this.isOwnerOfHouse.isSatisfiedBy(transaction.budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const category = await this.transactionCategoryRepository.findOneById(
      categoryId,
    );
    if (!(category instanceof TransactionCategory)) {
      throw new BadRequestException('budget.category.not.found');
    }

    transaction.update(name, amount * 100, note, type, category);

    await this.transactionRepository.save(transaction);

    return new TransactionView(
      transaction.id,
      transaction.name,
      transaction.type,
      transaction.amount / 100,
      transaction.note,
      transaction.createdAt,
      new TransactionCategoryView(category.id, category.name),
      new OwnerView(user.firstName, user.lastName),
    );
  };
}

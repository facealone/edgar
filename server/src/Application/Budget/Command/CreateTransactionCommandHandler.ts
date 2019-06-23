import {
  Inject,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './CreateTransactionCommand';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { TransactionView } from '../View/TransactionView';
import { House } from 'src/Domain/House/House.entity';
import { ITransactionCategoryRepository } from 'src/Domain/Budget/Repository/ITransactionCategoryRepository';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { TransactionCategoryView } from '../View/TransactionCategoryView';
import { OwnerView } from 'src/Application/User/View/OwnerView';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ITransactionCategoryRepository')
    private readonly transactionCategoryRepository: ITransactionCategoryRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (
    command: CreateTransactionCommand,
  ): Promise<TransactionView> => {
    const { name, note, transactionCategory, type, user } = command;
    const amount = command.amount * 100;
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException('user.empty.current_house');
    }

    if (false === (await this.isOwnerOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.owner.of.house');
    }

    const category = await this.transactionCategoryRepository.findOneById(
      transactionCategory,
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
        type,
        user,
        house,
      }),
    );

    return new TransactionView(
      transaction.id,
      transaction.name,
      transaction.type,
      transaction.amount / 100,
      transaction.note,
      transaction.createdAt,
      new OwnerView(user.firstName, user.lastName),
      new TransactionCategoryView(category.id, category.name, category.icon),
    );
  };
}

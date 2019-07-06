import { Inject, ForbiddenException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ITransactionRepository } from 'src/Domain/Budget/Repository/ITransactionRepository';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { RemoveTransactionCommand } from './RemoveTransactionCommand';

@CommandHandler(RemoveTransactionCommand)
export class RemoveTransactionCommandHandler {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private readonly isOwnerOfHouse: IsOwnerOfHouse,
  ) {}

  public execute = async (command: RemoveTransactionCommand) => {
    const { transaction, user } = command;

    if (
      false ===
      (await this.isOwnerOfHouse.isSatisfiedBy(transaction.budget.house, user))
    ) {
      throw new ForbiddenException('not.owner.of.house');
    }

    this.transactionRepository.remove(transaction);
  };
}

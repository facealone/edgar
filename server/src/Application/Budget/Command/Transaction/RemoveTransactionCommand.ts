import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';

export class RemoveTransactionCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly transaction: Transaction,
  ) {}
}

import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { TransactionCategoryRepository } from './Repository/TransactionCategoryRepository';
import { GetTransactionsCategoriesController } from './Controller/Transaction/GetTransactionsCategoriesController';
import { GetTransactionsCategoriesQueryHandler } from 'src/Application/Budget/Query/Transaction/GetTransactionsCategoriesQueryHandler';
import { TransactionRepository } from './Repository/TransactionRepository';
import { CreateTransactionController } from './Controller/CreateTransactionController';
import { CreateTransactionCommandHandler } from 'src/Application/Budget/Command/Transaction/CreateTransactionCommandHandler';
import { GetTransactionsController } from './Controller/Transaction/GetTransactionsController';
import { GetTransactionsByBudgetQueryHandler } from 'src/Application/Budget/Query/Transaction/GetTransactionsByBudgetQueryHandler';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';
import { GetBudgetsController } from './Controller/GetBudgetsController';
import { GetBudgetsByHouseQueryHandler } from 'src/Application/Budget/Query/GetBudgetsByHouseQueryHandler';
import { BudgetRepository } from './Repository/BudgetRepository';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { CreateBudgetController } from './Controller/CreateBudgetController';
import { CreateBudgetCommandHandler } from 'src/Application/Budget/Command/CreateBudgetCommandHandler';
import { GetBudgetByIdQueryHandler } from 'src/Application/Budget/Query/GetBudgetByIdQueryHandler';
import { GetTransactionByIdQueryHandler } from 'src/Application/Budget/Query/Transaction/GetTransactionByIdQueryHandler';
import { RemoveTransactionController } from './Controller/Transaction/RemoveTransactionController';
import { RemoveTransactionCommandHandler } from 'src/Application/Budget/Command/Transaction/RemoveTransactionCommandHandler';
import { UpdateBudgetController } from './Controller/Transaction/UpdateBudgetController';
import { UpdateBudgetCommandHandler } from 'src/Application/Budget/Command/UpdateBudgetCommandHandler';
import { UpdateTransactionCommandHandler } from 'src/Application/Budget/Command/Transaction/UpdateTransactionCommandHandler';
import { UpdateTransactionController } from './Controller/Transaction/UpdateTransactionController';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([
      Budget,
      Transaction,
      TransactionCategory,
      UserHouse,
    ]),
  ],
  controllers: [
    GetBudgetsController,
    CreateBudgetController,
    UpdateBudgetController,
    GetTransactionsController,
    CreateTransactionController,
    UpdateTransactionController,
    RemoveTransactionController,
    GetTransactionsCategoriesController,
  ],
  providers: [
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    { provide: 'ITransactionRepository', useClass: TransactionRepository },
    { provide: 'IBudgetRepository', useClass: BudgetRepository },
    {
      provide: 'ITransactionCategoryRepository',
      useClass: TransactionCategoryRepository,
    },
    GetTransactionsCategoriesQueryHandler,
    GetBudgetsByHouseQueryHandler,
    CreateTransactionCommandHandler,
    CreateBudgetCommandHandler,
    GetTransactionsByBudgetQueryHandler,
    GetBudgetByIdQueryHandler,
    GetTransactionByIdQueryHandler,
    RemoveTransactionCommandHandler,
    UpdateBudgetCommandHandler,
    UpdateTransactionCommandHandler,
    IsOwnerOfHouse,
  ],
})
export class BudgetModule {}

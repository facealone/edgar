import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { TransactionCategoryRepository } from './Repository/TransactionCategoryRepository';
import { GetTransactionsCategoriesController } from './Controller/GetTransactionsCategoriesController';
import { GetTransactionsCategoriesQueryHandler } from 'src/Application/Budget/Query/GetTransactionsCategoriesQueryHandler';
import { TransactionRepository } from './Repository/TransactionRepository';
import { CreateTransactionController } from './Controller/CreateTransactionController';
import { CreateTransactionCommandHandler } from 'src/Application/Budget/Command/CreateTransactionCommandHandler';
import { GetTransactionsController } from './Controller/GetTransactionsController';
import { GetTransactionsByHouseQueryHandler } from 'src/Application/Budget/Query/GetTransactionsByHouseQueryHandler';
import { IsOwnerOfHouse } from 'src/Domain/User/IsOwnerOfHouse';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Transaction, TransactionCategory, UserHouse]),
  ],
  controllers: [
    GetTransactionsCategoriesController,
    CreateTransactionController,
    GetTransactionsController,
  ],
  providers: [
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    { provide: 'ITransactionRepository', useClass: TransactionRepository },
    {
      provide: 'ITransactionCategoryRepository',
      useClass: TransactionCategoryRepository,
    },
    GetTransactionsCategoriesQueryHandler,
    CreateTransactionCommandHandler,
    GetTransactionsByHouseQueryHandler,
    IsOwnerOfHouse,
  ],
})
export class BudgetModule {}

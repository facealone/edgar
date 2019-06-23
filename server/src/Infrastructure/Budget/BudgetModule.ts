import { Module } from '@nestjs/common';
import { BusModule } from '../BusModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { UserHouseRepository } from '../User/Repository/UserHouseRepository';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';
import { TransactionCategory } from 'src/Domain/Budget/TransactionCategory.entity';
import { TransactionCategoryRepository } from './Repository/TransactionCategoryRepository';
import { GetTransactionsCategoriesController } from './Controller/GetTransactionsCategoriesController';
import { GetTransactionsCategoriesQueryHandler } from 'src/Application/Budget/Query/GetTransactionsCategoriesQueryHandler';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Transaction, TransactionCategory, UserHouse]),
  ],
  controllers: [GetTransactionsCategoriesController],
  providers: [
    { provide: 'IUserHouseRepository', useClass: UserHouseRepository },
    {
      provide: 'ITransactionCategoryRepository',
      useClass: TransactionCategoryRepository,
    },
    GetTransactionsCategoriesQueryHandler,
    IsMemberOfHouse,
  ],
})
export class BudgetModule {}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { Budget } from './Budget.entity';
import { TransactionCategory } from './TransactionCategory.entity';

export enum TransactionType {
  CASH_OUTLAY = 'cash_outlay',
  CASH_INFLOW = 'cash_inflow',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.CASH_OUTLAY,
  })
  type: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => Budget, budget => budget.transactions, { nullable: false })
  budget: Budget;

  @ManyToOne(type => TransactionCategory, { nullable: false })
  category: TransactionCategory;

  constructor(transaction: Partial<Transaction>) {
    Object.assign(this, transaction);
  }
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { Budget } from './Budget.entity';
import { TransactionCategory } from './TransactionCategory.entity';

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

  public update = (
    name: string,
    amount: number,
    note: string,
    category: TransactionCategory,
  ): void => {
    this.name = name;
    this.amount = amount;
    this.note = note;
    this.category = category;
  };
}

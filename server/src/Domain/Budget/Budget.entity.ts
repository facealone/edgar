import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../User/User.entity';
import { House } from '../House/House.entity';
import { Transaction } from './Transaction.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  amount: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  shared: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => House, { nullable: false })
  house: House;

  @OneToMany(type => Transaction, transaction => transaction.budget)
  transactions: Transaction[];

  constructor(budget: Partial<Budget>) {
    Object.assign(this, budget);
  }

  public update = (name: string, amount: number, shared: boolean): void => {
    this.name = name;
    this.amount = amount;
    this.shared = shared;
  };
}

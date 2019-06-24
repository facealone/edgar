import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { House } from '../House/House.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  amount: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  private: boolean;

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

  constructor(budget: Partial<Budget>) {
    Object.assign(this, budget);
  }
}

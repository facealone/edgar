import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { House } from '../House/House.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  barCode: string;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => House, { nullable: false })
  house: House;

  constructor(card: Partial<Card>) {
    Object.assign(this, card);
  }
}

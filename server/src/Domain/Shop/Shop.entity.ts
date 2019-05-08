import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { House } from '../House/House.entity';
import { User } from '../User/User.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(type => House, { nullable: false })
  house: House;

  @ManyToOne(type => User, { nullable: false })
  owner: User;

  constructor(shop: Partial<Shop>) {
    Object.assign(this, shop);
  }
}

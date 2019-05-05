import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { UserHouse } from '../User/UserHouse.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(type => UserHouse, userHouse => userHouse.house)
  @JoinTable()
  userHouses: UserHouse[];

  constructor(house: Partial<House>) {
    Object.assign(this, house);
  }

  update(name: string) {
    this.name = name;
  }
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { House } from '../House/House.entity';
import { UserHouse } from './UserHouse.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({ type: 'text' })
  pushNotificationToken: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(type => House)
  currentHouse: House;

  @ManyToMany(type => UserHouse, userHouse => userHouse.user)
  @JoinTable()
  userHouses: UserHouse[];

  @BeforeInsert()
  hashPassword = async () => {
    if (!this.password) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 10);
  };
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
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

  @Column({ type: 'text', nullable: true })
  @Exclude()
  pushNotificationToken: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @ManyToOne(type => House)
  currentHouse: House;

  @ManyToMany(type => UserHouse, userHouse => userHouse.user)
  @Exclude()
  @JoinTable()
  userHouses: UserHouse[];

  @BeforeInsert()
  @Exclude()
  hashPassword = async () => {
    if (!this.password) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 10);
  };

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

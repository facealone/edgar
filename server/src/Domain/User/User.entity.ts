import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
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
  pushNotificationToken: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(type => House)
  currentHouse: House;

  @ManyToMany(type => UserHouse, userHouse => userHouse.user)
  @JoinTable()
  userHouses: UserHouse[];

  @BeforeInsert()
  hashPassword = () => {
    if (!this.password) {
      return;
    }

    this.password = bcrypt.hashSync(this.password, 10);
  };

  isPasswordValid = (plainPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, this.password);
  };

  getFullName = (): string => {
    return this.firstName + ' ' + this.lastName.toUpperCase();
  };

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

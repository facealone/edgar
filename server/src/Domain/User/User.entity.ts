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

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ type: 'text', nullable: true })
  pushNotificationToken: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToOne(type => House)
  currentHouse: House;

  @ManyToMany(type => UserHouse, userHouse => userHouse.user)
  @JoinTable()
  userHouses: UserHouse[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

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

  update = (firstName: string, lastName: string, email: string): void => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  };

  updateCurrentHouse = (house: House): void => {
    this.currentHouse = house;
  };

  updatePushNotificationToken = (pushNotificationToken: string): void => {
    this.pushNotificationToken = pushNotificationToken;
  };
}

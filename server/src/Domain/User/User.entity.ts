import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Index,
} from 'typeorm';
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

  @Index('api-token')
  @Column({ type: 'text', nullable: true })
  apiToken: string;

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

  public update = (
    firstName: string,
    lastName: string,
    email: string,
  ): void => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  };

  public updateCurrentHouse = (house: House): void => {
    this.currentHouse = house;
  };

  public updatePushNotificationToken = (
    pushNotificationToken: string,
  ): void => {
    this.pushNotificationToken = pushNotificationToken;
  };
}

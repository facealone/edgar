import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { House } from '../House/House.entity';
import { User } from './User.entity';

export enum UserRole {
  OWNER = 'ROLE_OWNER',
  GUEST = 'ROLE_GUEST',
}

@Entity()
export class UserHouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  emailNotification: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  pushNotification: boolean;

  @ManyToOne(type => House, { nullable: false })
  house: House;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  constructor(userHouse: Partial<UserHouse>) {
    Object.assign(this, userHouse);
  }
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { House } from './House.entity';
import { User } from '../User/User.entity';
import { UserRole } from '../User/UserHouse.entity';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: string;

  @ManyToOne(type => House, { onDelete: 'CASCADE' })
  house: House;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  user: User;

  constructor(voucher: Partial<Voucher>) {
    Object.assign(this, voucher);
  }
}

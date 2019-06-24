import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { House } from './House.entity';
import { User } from '../User/User.entity';
import { UserRole } from '../User/UserHouse.entity';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
    nullable: false,
  })
  role: string;

  @ManyToOne(type => House, { onDelete: 'CASCADE', nullable: false })
  house: House;

  @ManyToOne(type => User, { onDelete: 'CASCADE', nullable: false })
  user: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  constructor(voucher: Partial<Voucher>) {
    Object.assign(this, voucher);
  }
}

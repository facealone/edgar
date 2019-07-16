import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Shop } from './Shop.entity';
import { User } from '../User/User.entity';
import { ShoppingListCategory } from './ShoppingListCategory.entity';

@Entity()
export class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  information: string;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => ShoppingListCategory)
  shoppingListCategory: ShoppingListCategory;

  @ManyToOne(type => Shop, { nullable: false })
  shop: Shop;
}

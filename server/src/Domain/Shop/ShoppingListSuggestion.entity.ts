import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ShoppingListCategory } from './ShoppingListCategory.entity';

@Entity()
export class ShoppingListSuggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(type => ShoppingListCategory)
  shoppingListCategory: ShoppingListCategory;
}

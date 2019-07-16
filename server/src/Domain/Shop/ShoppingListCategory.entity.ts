import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingListCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', default: 1 })
  position: number;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}

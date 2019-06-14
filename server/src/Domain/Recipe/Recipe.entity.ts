import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { House } from '../House/House.entity';
import { User } from '../User/User.entity';
import { RecipeCategory } from './RecipeCategory.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  uri: string;

  @ManyToOne(type => House, { nullable: false })
  house: House;

  @ManyToOne(type => User, { nullable: false })
  owner: User;

  @ManyToOne(type => RecipeCategory, { nullable: false })
  category: RecipeCategory;

  constructor(recipe: Partial<Recipe>) {
    Object.assign(this, recipe);
  }
}

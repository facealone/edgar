import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IRecipeCategoryRepository } from 'src/Domain/Recipe/Repository/IRecipeCategoryRepository';
import { RecipeCategory } from 'src/Domain/Recipe/RecipeCategory.entity';

@Injectable()
export class RecipeCategoryRepository implements IRecipeCategoryRepository {
  constructor(
    @InjectRepository(RecipeCategory)
    private readonly repository: Repository<RecipeCategory>,
  ) {}

  public findAll = async (): Promise<RecipeCategory[]> => {
    return await this.repository.find();
  };

  public findOneById = async (id: string): Promise<RecipeCategory | null> => {
    return await this.repository.findOne({ where: { id } });
  };
}

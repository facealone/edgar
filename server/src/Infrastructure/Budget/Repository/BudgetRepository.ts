import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/Domain/Budget/Budget.entity';
import { IBudgetRepository } from 'src/Domain/Budget/Repository/IBudgetRepository';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class BudgetRepository implements IBudgetRepository {
  constructor(
    @InjectRepository(Budget)
    private readonly repository: Repository<Budget>,
  ) {}

  public save = async (budget: Budget): Promise<Budget> => {
    return await this.repository.save(budget);
  };

  public findOneById = async (id: string): Promise<Budget> => {
    return await this.repository.findOne({
      where: { id },
      relations: ['house'],
    });
  };

  public findByHouse = async (house: House): Promise<Budget[]> => {
    return await this.repository.find({
      where: { house },
      order: { createdAt: 'DESC' },
    });
  };
}

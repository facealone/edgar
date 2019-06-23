import { IHouseRepository } from 'src/Domain/House/Repository/IHouseRepository';
import { House } from 'src/Domain/House/House.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HouseRepository implements IHouseRepository {
  constructor(
    @InjectRepository(House)
    private readonly repository: Repository<House>,
  ) {}

  public save = async (house: House): Promise<House> => {
    return await this.repository.save(house);
  };

  public find = async (id: string): Promise<House | null> => {
    return await this.repository.findOne({ id });
  };
}

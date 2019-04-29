import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';

@Injectable()
export class UserHouseRepository implements IUserHouseRepository {
  constructor(
    @InjectRepository(UserHouse)
    private readonly repository: Repository<UserHouse>,
  ) {}

  public save = async (userHouse: UserHouse): Promise<UserHouse> => {
    return await this.repository.save(userHouse);
  };
}

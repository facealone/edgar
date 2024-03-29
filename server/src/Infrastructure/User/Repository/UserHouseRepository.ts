import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { IUserHouseRepository } from 'src/Domain/User/Repository/IUserHouseRepository';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { HouseFiltersDto } from 'src/Infrastructure/House/Controller/Dto/HouseFiltersDto';
import { MemberFiltersDto } from '../Controller/Dto/MemberFiltersDto';

@Injectable()
export class UserHouseRepository implements IUserHouseRepository {
  constructor(
    @InjectRepository(UserHouse)
    private readonly repository: Repository<UserHouse>,
  ) {}

  public save = async (userHouse: UserHouse): Promise<UserHouse> => {
    return await this.repository.save(userHouse);
  };

  public findOneByUserAndHouse = async (
    user: User,
    house: House,
  ): Promise<UserHouse | null> => {
    return await this.repository
      .createQueryBuilder('userHouse')
      .select('userHouse.id')
      .where('userHouse.house = :house AND userHouse.user = :user', {
        user: user.id,
        house: house.id,
      })
      .getOne();
  };

  public findOneByUserHouseRole = async (
    user: User,
    house: House,
    role: string,
  ): Promise<UserHouse | null> => {
    return await this.repository
      .createQueryBuilder('userHouse')
      .select('userHouse.id')
      .where(
        'userHouse.house = :house AND userHouse.user = :user AND userHouse.role = :role',
        {
          user: user.id,
          house: house.id,
          role,
        },
      )
      .getOne();
  };

  public findByUser = async (
    user: User,
    filters: HouseFiltersDto,
  ): Promise<[UserHouse[], number]> => {
    return await this.repository
      .createQueryBuilder('userHouse')
      .select([
        'house.id',
        'house.name',
        'userHouse.role',
        'userHouse.createdAt',
      ])
      .where('userHouse.user = :user', {
        user: user.id,
      })
      .innerJoin('userHouse.house', 'house')
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };

  public findByHouse = async (
    house: House,
    filters: MemberFiltersDto,
  ): Promise<[UserHouse[], number]> => {
    return await this.repository
      .createQueryBuilder('userHouse')
      .select([
        'user.id',
        'user.firstName',
        'user.email',
        'user.lastName',
        'userHouse.role',
      ])
      .where('userHouse.house = :house', {
        house: house.id,
      })
      .innerJoin('userHouse.user', 'user')
      .offset((filters.page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };
}

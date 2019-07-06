import { UserHouse } from '../UserHouse.entity';
import { User } from '../User.entity';
import { House } from 'src/Domain/House/House.entity';
import { HouseFiltersDto } from 'src/Infrastructure/House/Controller/Dto/HouseFiltersDto';
import { MemberFiltersDto } from 'src/Infrastructure/User/Controller/Dto/MemberFiltersDto';

export interface IUserHouseRepository {
  save(user: UserHouse): Promise<UserHouse>;
  findOneByUserAndHouse(user: User, house: House): Promise<UserHouse | null>;
  findOneByUserHouseRole(
    user: User,
    house: House,
    role: string,
  ): Promise<UserHouse | null>;
  findByUser(
    user: User,
    filters: HouseFiltersDto,
  ): Promise<[UserHouse[], number]>;
  findByHouse(
    house: House,
    filters: MemberFiltersDto,
  ): Promise<[UserHouse[], number]>;
}

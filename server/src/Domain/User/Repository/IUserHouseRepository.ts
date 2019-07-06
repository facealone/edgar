import { UserHouse } from '../UserHouse.entity';
import { User } from '../User.entity';
import { House } from 'src/Domain/House/House.entity';

export interface IUserHouseRepository {
  save(user: UserHouse): Promise<UserHouse>;
  findOneByUserAndHouse(user: User, house: House): Promise<UserHouse | null>;
  findOneByUserHouseRole(
    user: User,
    house: House,
    role: string,
  ): Promise<UserHouse | null>;
  findByUser(user: User, page: number): Promise<[UserHouse[], number]>;
  findByHouse(house: House, page: number): Promise<[UserHouse[], number]>;
}

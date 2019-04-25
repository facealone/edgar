import { UserHouse } from '../UserHouse.entity';

export interface IUserHouseRepository {
  save(user: UserHouse): Promise<UserHouse>;
}

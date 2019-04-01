import { User } from '../User.entity';

export interface IUserRepository {
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
}

import { User } from '../User.entity';

export interface IUserRepository {
  findOneByApiToken(apiToken: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

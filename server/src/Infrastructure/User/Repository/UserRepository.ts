import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  public findOneById = async (id: string): Promise<User | null> => {
    return await this.repository.findOne({
      where: { id },
      relations: ['currentHouse'],
    });
  };

  public findOneByEmail = async (email: string): Promise<User | null> => {
    return await this.repository.findOne({
      where: { email },
      relations: ['currentHouse'],
    });
  };

  public save = async (user: User): Promise<User> => {
    return await this.repository.save(user);
  };
}

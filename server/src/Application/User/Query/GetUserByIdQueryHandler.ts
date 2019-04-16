import { QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject } from '@nestjs/common';
import { GetUserByIdQuery } from './GetUserByIdQuery';
import { User } from 'src/Domain/User/User.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  execute = async (query: GetUserByIdQuery): Promise<User | null> => {
    return await this.userRepository.findOneById(query.id);
  };
}

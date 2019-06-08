import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByApiToken } from './GetUserByApiTokenQuery';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';

@QueryHandler(GetUserByApiToken)
export class GetUserByApiTokenHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = (query: GetUserByApiToken): Promise<User> => {
    return this.userRepository.findOneByApiToken(query.apiToken);
  };
}

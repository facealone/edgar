import { QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject } from '@nestjs/common';
import { GetUserByIdQuery } from './GetUserByIdQuery';
import { User } from 'src/Domain/User/User.entity';
import { UserDetailView } from '../View/UserDetailView';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  execute = async (query: GetUserByIdQuery): Promise<UserDetailView | null> => {
    const user = await this.userRepository.findOneById(query.id);
    if (!(user instanceof User)) {
      return null;
    }

    return new UserDetailView(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
    );
  };
}

import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from './Repository/IUserRepository';
import { User } from './User.entity';

@Injectable()
export class CanUserCreateAccount {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  isSatisfiedBy = async (email: string): Promise<boolean> => {
    const user = await this.userRepository.findOneByEmail(email);

    return !(user instanceof User);
  };
}

import { User } from './User.entity';
import { Inject } from '@nestjs/common';
import { IUserHouseRepository } from './Repository/IUserHouseRepository';
import { UserHouse, UserRole } from './UserHouse.entity';
import { House } from '../House/House.entity';

export class IsOwnerOfHouse {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  public isSatisfiedBy = async (house: House, user: User): Promise<boolean> => {
    return (
      (await this.userHouseRepository.findOneByUserHouseRole(
        user,
        house,
        UserRole.OWNER,
      )) instanceof UserHouse
    );
  };
}

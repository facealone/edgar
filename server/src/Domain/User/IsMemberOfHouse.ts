import { Inject } from '@nestjs/common';
import { IUserHouseRepository } from '../User/Repository/IUserHouseRepository';
import { UserHouse } from '../User/UserHouse.entity';
import { House } from '../House/House.entity';
import { User } from './User.entity';

export class IsMemberOfHouse {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  public isSatisfiedBy = async (house: House, user: User): Promise<boolean> => {
    return (
      (await this.userHouseRepository.findOneByUserAndHouse(
        user,
        house,
      )) instanceof UserHouse
    );
  };
}

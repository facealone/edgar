import { Voucher } from './Voucher.entity';
import { User } from '../User/User.entity';
import { Inject } from '@nestjs/common';
import { IUserHouseRepository } from '../User/Repository/IUserHouseRepository';
import { UserHouse } from '../User/UserHouse.entity';

export class CanConsumeVoucher {
  constructor(
    @Inject('IUserHouseRepository')
    private readonly userHouseRepository: IUserHouseRepository,
  ) {}

  public isSatisfiedBy = async (
    voucher: Voucher,
    user: User,
  ): Promise<boolean> => {
    return !(
      (await this.userHouseRepository.findOneByUserAndHouse(
        user,
        voucher.house,
      )) instanceof UserHouse
    );
  };
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Validator } from 'class-validator';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

@Injectable()
export class HouseMemberGuard implements CanActivate {
  constructor(
    @Inject('IsMemberOfHouse')
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const houseId = request.params.houseId || request.params.id;

    if (!(user instanceof User) || false === new Validator().isUUID(houseId)) {
      return false;
    }

    return await this.isMemberOfHouse.isSatisfiedBy(
      new House({ id: houseId }),
      user,
    );
  };
}

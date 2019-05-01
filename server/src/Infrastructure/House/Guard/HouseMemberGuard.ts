import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HouseMemberGuard implements CanActivate {
  public canActivate = (context: ExecutionContext): boolean => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const houseId = request.params.id;

    return houseId === user.currentHouse.id;
  };
}

import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { GetUsersByHouseQuery } from 'src/Application/User/Query/GetUsersByHouseQuery';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';
import { GetUsersByHouseView } from 'src/Application/User/View/GetUsersByHouseView';

@ApiBearerAuth()
@Controller('/users/me/current-house')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetUsersController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get members of the logged user current house' })
  @Get('/members')
  public async index(@LoggedUser() user: User): Promise<GetUsersByHouseView[]> {
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(new GetUsersByHouseQuery(house, user));
  }
}

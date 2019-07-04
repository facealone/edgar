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
import { GetShopsByHouseQuery } from 'src/Application/Shop/Query/GetShopsByHouseQuery';
import { ShopView } from 'src/Application/Shop/View/ShopView';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('/users/me/current-house')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetShopsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get shops of the logged user current house' })
  @Get('/shops')
  public async index(@LoggedUser() user: User): Promise<ShopView[]> {
    if (!user.currentHouse) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(new GetShopsByHouseQuery(user));
  }
}

import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  UseGuards,
  Controller,
  Inject,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetCardsByHouseQuery } from 'src/Application/Card/Query/GetCardsByHouseQuery';
import { CardView } from 'src/Application/Card/View/CardView';
import { House } from 'src/Domain/House/House.entity';

@ApiBearerAuth()
@Controller('users/me/current-house')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetCardsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get cards of the logged user current house' })
  @Get('/cards')
  public async index(@LoggedUser() user: User): Promise<CardView[]> {
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(new GetCardsByHouseQuery(house, user));
  }
}

import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { GetUsersByHouseQuery } from 'src/Application/User/Query/GetUsersByHouseQuery';
import { User } from 'src/Domain/User/User.entity';
import { HouseIdDto } from './Dto/HouseIdDto';
import { GetHouseByIdQuery } from 'src/Application/House/Query/GetHouseByIdQuery';
import { House } from 'src/Domain/House/House.entity';

@ApiBearerAuth()
@Controller('houses')
@ApiUseTags('House')
@UseGuards(AuthGuard())
export class GetUsersController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get house users by logged user' })
  @Get('/:id/users')
  public async index(
    @Param() houseIdDto: HouseIdDto,
    @LoggedUser() user: User,
  ) {
    const houseQuery = new GetHouseByIdQuery();
    houseQuery.id = houseIdDto.id;

    const house = await this.queryBus.execute(houseQuery);

    if (!(house instanceof House)) {
      throw new NotFoundException();
    }

    return await this.queryBus.execute(new GetUsersByHouseQuery(house, user));
  }
}

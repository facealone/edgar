import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Inject, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../../User/Decorator/LoggedUserDecorator';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetHousesByUserQuery } from 'src/Application/User/Query/GetHousesByUserQuery';
import { User } from 'src/Domain/User/User.entity';
import { GetHousesByUserView } from 'src/Application/User/View/GetHousesByUserView';
import { Pagination } from 'src/Application/Common/Pagination';

@ApiBearerAuth()
@Controller('users/me')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetHousesController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get logged user houses' })
  @Get('/houses')
  public async index(
    @LoggedUser() user: User,
  ): Promise<Pagination<GetHousesByUserView>> {
    return await this.queryBus.execute(new GetHousesByUserQuery(user));
  }
}

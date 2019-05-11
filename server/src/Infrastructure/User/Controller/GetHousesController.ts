import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Inject, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetUserHousesByUserQuery } from 'src/Application/User/Query/GetUserHousesByUserQuery';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetHousesController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly commandBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get logged user houses' })
  @Get('/me/houses')
  public async index(@LoggedUser() user) {
    return await this.commandBus.execute(new GetUserHousesByUserQuery(user));
  }
}

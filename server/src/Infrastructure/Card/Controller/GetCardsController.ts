import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Controller, Inject, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetCardsByUserQuery } from 'src/Application/Card/Query/GetCardsByUserQuery';
import { CardView } from 'src/Application/Card/View/CardView';

@ApiBearerAuth()
@Controller('users/me')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetCardsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get logged user loyalty cards' })
  @Get('/cards')
  public async index(@LoggedUser() user: User): Promise<CardView[]> {
    return await this.queryBus.execute(new GetCardsByUserQuery(user));
  }
}

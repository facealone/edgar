import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { House } from 'src/Domain/House/House.entity';
import { GetTransactionsByHouseQuery } from 'src/Application/Budget/Query/GetTransactionsByHouseQuery';
import { TransactionListView } from 'src/Application/Budget/View/TransactionListView';

@ApiBearerAuth()
@Controller('users/me/current-house')
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class GetTransactionsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get transactions of the logged user current house',
  })
  @Get('transactions')
  public index(@LoggedUser() user: User): TransactionListView {
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    return this.queryBus.execute(new GetTransactionsByHouseQuery(user, house));
  }
}

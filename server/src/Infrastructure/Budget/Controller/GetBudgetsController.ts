import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { House } from 'src/Domain/House/House.entity';
import { BudgetView } from 'src/Application/Budget/View/BudgetView';
import { BudgetFilterDto } from './Dto/BudgetFilterDto';
import { GetBudgetsByHouseQuery } from 'src/Application/Budget/Query/GetBudgetsByHouseQuery';

@ApiBearerAuth()
@Controller('users/me/current-house')
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class GetBudgetsController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get budgets of the logged user current house',
  })
  @Get('budgets')
  public index(
    @Query() budgetFilterDto: BudgetFilterDto,
    @LoggedUser() user: User,
  ): BudgetView[] {
    const house = user.currentHouse;

    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    return this.queryBus.execute(
      new GetBudgetsByHouseQuery(user, house, new Date(budgetFilterDto.date)),
    );
  }
}

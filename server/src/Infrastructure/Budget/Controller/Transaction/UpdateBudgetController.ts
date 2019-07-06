import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Body,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { BudgetView } from 'src/Application/Budget/View/BudgetView';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { UpdateBudgetCommand } from 'src/Application/Budget/Command/UpdateBudgetCommand';
import { GetBudgetByIdQuery } from 'src/Application/Budget/Query/GetBudgetByIdQuery';
import { Budget } from 'src/Domain/Budget/Budget.entity';

@ApiBearerAuth()
@Controller()
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class UpdateBudgetController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Update budget by the logged user',
  })
  @Put('budgets/:id')
  public async index(
    @Param() query: GetBudgetByIdQuery,
    @Body() command: UpdateBudgetCommand,
    @LoggedUser() user: User,
  ): Promise<BudgetView> {
    query.user = user;

    const budget = await this.queryBus.execute(query);
    if (!(budget instanceof Budget)) {
      throw new NotFoundException();
    }

    command.user = user;
    command.budget = budget;

    return this.commandBus.execute(command);
  }
}

import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, UseGuards, Inject, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateBudgetCommand } from 'src/Application/Budget/Command/CreateBudgetCommand';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { BudgetView } from 'src/Application/Budget/View/BudgetView';

@ApiBearerAuth()
@Controller('budgets')
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class CreateBudgetController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Create budget by the logged user in him current house',
  })
  @Post()
  public index(
    @Body() command: CreateBudgetCommand,
    @LoggedUser() user: User,
  ): BudgetView {
    command.user = user;

    return this.commandBus.execute(command);
  }
}

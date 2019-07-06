import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, UseGuards, Inject, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateTransactionCommand } from 'src/Application/Budget/Command/Transaction/CreateTransactionCommand';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { TransactionView } from 'src/Application/Budget/View/TransactionView';

@ApiBearerAuth()
@Controller('transactions')
@ApiUseTags('Budget')
@UseGuards(AuthGuard())
export class CreateTransactionController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Create transaction by the logged user in him current house',
  })
  @Post()
  public async index(
    @Body() command: CreateTransactionCommand,
    @LoggedUser() user: User,
  ): Promise<TransactionView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

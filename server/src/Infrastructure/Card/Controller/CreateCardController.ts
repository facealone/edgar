import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Post, Controller, Inject, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { CreateCardCommand } from 'src/Application/Card/Command/CreateCardCommand';
import { CardCreatedView } from 'src/Application/Card/View/CardCreatedView';

@ApiBearerAuth()
@Controller('cards')
@ApiUseTags('Card')
@UseGuards(AuthGuard())
export class CreateCardController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create card by logged user' })
  @Post()
  public async index(
    @Body() command: CreateCardCommand,
    @LoggedUser() user: User,
  ): Promise<CardCreatedView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

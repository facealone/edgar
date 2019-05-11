import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Post, Controller, Inject, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { CreateCardCommand } from 'src/Application/Card/Command/CreateCardCommand';
import { CardView } from 'src/Application/Card/View/CardView';

@ApiBearerAuth()
@Controller('cards')
@ApiUseTags('Card')
@UseGuards(AuthGuard())
export class CreateCardController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create loyalty card by logged user' })
  @Post()
  public async index(
    @Body() command: CreateCardCommand,
    @LoggedUser() user: User,
  ): Promise<CardView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

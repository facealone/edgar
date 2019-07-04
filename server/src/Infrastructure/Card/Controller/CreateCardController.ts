import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  UseGuards,
  Post,
  Controller,
  Inject,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { CreateCardCommand } from 'src/Application/Card/Command/CreateCardCommand';
import { CardView } from 'src/Application/Card/View/CardView';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('cards')
@ApiUseTags('Card')
@UseGuards(AuthGuard())
export class CreateCardController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create card by the logged user in him current ' })
  @Post()
  public async index(
    @Body() command: CreateCardCommand,
    @LoggedUser() user: User,
  ): Promise<CardView> {
    command.user = user;
    if (!user.currentHouse) {
      throw new BadRequestException('user.empty.current_house');
    }

    return await this.commandBus.execute(command);
  }
}

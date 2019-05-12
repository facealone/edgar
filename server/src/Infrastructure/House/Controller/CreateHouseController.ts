import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateHouseCommand } from 'src/Application/House/Command/CreateHouseCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { HouseView } from 'src/Application/House/View/HouseView';

@Controller('houses')
@ApiUseTags('House')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CreateHouseController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create house by the logged user' })
  @Post()
  public async index(
    @Body() command: CreateHouseCommand,
    @LoggedUser() user: User,
  ): Promise<HouseView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

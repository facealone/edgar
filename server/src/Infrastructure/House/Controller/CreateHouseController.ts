import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateHouseCommand } from 'src/Application/House/Command/CreateHouseCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { CreateUserHouseCommand } from 'src/Application/User/Command/CreateUserHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { UserHouse } from 'src/Domain/User/UserHouse.entity';
import { UpdateCurrentHouseCommand } from 'src/Application/User/Command/UpdateCurrentHouseCommand';
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
    @LoggedUser() loggedUser: User,
  ): Promise<HouseView> {
    const house = await this.commandBus.execute(command);
    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    const userHouse = await this.commandBus.execute(
      new CreateUserHouseCommand(loggedUser, house),
    );
    if (!(userHouse instanceof UserHouse)) {
      throw new BadRequestException();
    }

    await this.commandBus.execute(
      new UpdateCurrentHouseCommand(loggedUser, house),
    );

    return new HouseView(house.id, house.name);
  }
}
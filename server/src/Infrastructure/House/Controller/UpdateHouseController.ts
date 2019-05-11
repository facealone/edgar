import {
  Inject,
  Put,
  Controller,
  UseGuards,
  Body,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { AuthGuard } from '@nestjs/passport';
import { UpdateHouseCommand } from 'src/Application/House/Command/UpdateHouseCommand';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';
import { GetHouseByIdQuery } from 'src/Application/House/Query/GetHouseByIdQuery';
import { HouseView } from 'src/Application/House/View/HouseView';

@Controller('houses')
@ApiUseTags('House')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UpdateHouseController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update house by the logged user' })
  @Put('/:id')
  public async index(
    @Param() query: GetHouseByIdQuery,
    @Body() command: UpdateHouseCommand,
    @LoggedUser() user: User,
  ): Promise<HouseView> {
    const house = await this.queryBus.execute(query);
    if (!(house instanceof House)) {
      throw new NotFoundException('house.not.found');
    }

    command.house = house;
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

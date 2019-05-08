import {
  Controller,
  UseGuards,
  Put,
  Inject,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { UpdateCurrentHouseCommand } from 'src/Application/User/Command/UpdateCurrentHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetHouseByIdQuery } from 'src/Application/House/Query/GetHouseByIdQuery';
import { CurrentHouseDto } from 'src/Infrastructure/User/Controller/DTO/CurrentHouseDto';
import { CurrentHouseUpdatedView } from 'src/Application/User/View/CurrentHouseUpdatedView';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class UpdateCurrentHouseController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update the current house of the logged user' })
  @Put('me/current-house')
  public async index(
    @Body() currentHouseDto: CurrentHouseDto,
    @LoggedUser() user: User,
  ): Promise<CurrentHouseUpdatedView> {
    const query = new GetHouseByIdQuery();
    query.id = currentHouseDto.house;

    const house = await this.queryBus.execute(query);

    if (!(house instanceof House)) {
      throw new NotFoundException('house.not.found');
    }

    return await this.commandBus.execute(
      new UpdateCurrentHouseCommand(user, house),
    );
  }
}

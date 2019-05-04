import { Controller, UseGuards, Put, Param, Inject } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HouseMemberGuard } from 'src/Infrastructure/User/Guard/HouseMemberGuard';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { UpdateCurrentHouseCommand } from 'src/Application/User/Command/UpdateCurrentHouseCommand';
import { House } from 'src/Domain/House/House.entity';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
export class SwitchCurrentHouseAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Switch the current house of the logged user' })
  @UseGuards(AuthGuard(), HouseMemberGuard)
  @Put('house/:houseId/switch')
  public async index(
    @Param('houseId') houseId: string,
    @LoggedUser() user: User,
  ): Promise<object> {
    await this.commandBus.execute(
      new UpdateCurrentHouseCommand(user, new House({ id: houseId })),
    );

    return {
      currentHouse: houseId,
    };
  }
}

import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateHouseCommand } from 'src/Application/House/Command/CreateHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';

@Controller('houses')
@ApiUseTags('House')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CreateHouseAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create new house' })
  async index(@Body() command: CreateHouseCommand): Promise<House> {
    return await this.commandBus.execute(command);
  }
}

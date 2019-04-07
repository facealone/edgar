import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Inject,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { CreateHouseCommand } from 'src/Application/House/Command/CreateHouseCommand';
import { House } from 'src/Domain/House/House.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';

@Controller('houses')
@ApiUseTags('House')
export class CreateHouseAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ title: 'Create new house' })
  async index(@Body() command: CreateHouseCommand): Promise<House> {
    return await this.commandBus.execute(command);
  }
}

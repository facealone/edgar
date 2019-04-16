import { ApiUseTags } from '@nestjs/swagger';
import { Post, Controller, Inject, Body } from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { RegisterCommand } from 'src/Application/Auth/Command/RegisterCommand';

@Controller('register')
@ApiUseTags('Auth')
export class RegisterAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  async index(@Body() command: RegisterCommand): Promise<object> {
    const accessToken = await this.commandBus.execute(command);

    return {
      accessToken,
    };
  }
}

import { ApiUseTags } from '@nestjs/swagger';
import { Post, Controller, Inject, Body } from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoginCommand } from 'src/Application/Auth/Command/LoginCommand';

@Controller('login')
@ApiUseTags('Auth')
export class LoginAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  async index(@Body() command: LoginCommand): Promise<object> {
    const accessToken = await this.commandBus.execute(command);

    return {
      accessToken,
    };
  }
}

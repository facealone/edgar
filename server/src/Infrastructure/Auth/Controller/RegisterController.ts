import { ApiUseTags } from '@nestjs/swagger';
import { Post, Controller, Inject, Body } from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { RegisterCommand } from 'src/Application/Auth/Command/RegisterCommand';
import { AuthenticatedView } from 'src/Application/Auth/View/AuthenticatedView';

@Controller('register')
@ApiUseTags('Auth')
export class RegisterController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  public async index(
    @Body() command: RegisterCommand,
  ): Promise<AuthenticatedView> {
    return await this.commandBus.execute(command);
  }
}

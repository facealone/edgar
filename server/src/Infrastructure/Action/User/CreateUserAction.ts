import { Post, Controller, Inject, Body, Logger } from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('users')
@ApiUseTags('Users')
export class CreateUserAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  index(@Body('user') createUserCommand: CreateUserCommand) {
    Logger.log(createUserCommand);
    this.commandBus.execute(createUserCommand);

    return 'test';
  }
}

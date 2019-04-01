import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Post,
  Controller,
  Inject,
  Body,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { User } from 'src/Domain/User/User.entity';

@Controller('users')
@ApiUseTags('Users')
export class CreateUserAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ title: 'Create new user' })
  async index(@Body() command: CreateUserCommand): Promise<User> {
    return await this.commandBus.execute(command);
  }
}

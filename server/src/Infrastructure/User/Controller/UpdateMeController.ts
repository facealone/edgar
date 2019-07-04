import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Put, Body, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { UpdateUserCommand } from 'src/Application/User/Command/UpdateUserCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class UpdateMeController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update logged user' })
  @Put('/me')
  public async index(
    @Body() command: UpdateUserCommand,
    @LoggedUser() user: User,
  ): Promise<User> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Put, Body, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailView } from 'src/Application/User/View/UserDetailView';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { UpdateUserCommand } from 'src/Application/User/Command/UpdateUserCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
export class UpdateLoggedUserController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update logged user' })
  @UseGuards(AuthGuard())
  @Put('/me')
  public async index(
    @Body() command: UpdateUserCommand,
    @LoggedUser() loggedUser,
  ): Promise<UserDetailView> {
    command.user = loggedUser;

    const user = await this.commandBus.execute(command);

    return new UserDetailView(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
    );
  }
}

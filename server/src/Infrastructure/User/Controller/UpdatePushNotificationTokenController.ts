import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Put, Body, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../Decorator/LoggedUserDecorator';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { UpdatePushNotificationTokenCommand } from 'src/Application/User/Command/UpdatePushNotificationTokenCommand';
import { PushNotifcationTokenUpdatedView } from 'src/Application/User/View/PushNotifcationTokenUpdatedView';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class UpdatePushNotificationTokenController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update the logged user push notification token' })
  @Put('/me/push-notification-token')
  public async index(
    @Body() command: UpdatePushNotificationTokenCommand,
    @LoggedUser() user: User,
  ): Promise<PushNotifcationTokenUpdatedView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

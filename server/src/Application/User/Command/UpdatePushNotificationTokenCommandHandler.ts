import { CommandHandler } from '@nestjs/cqrs';
import { UpdatePushNotificationTokenCommand } from './UpdatePushNotificationTokenCommand';
import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { PushNotifcationTokenUpdatedView } from '../View/PushNotifcationTokenUpdatedView';

@CommandHandler(UpdatePushNotificationTokenCommand)
export class UpdatePushNotificationTokenCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = async (
    command: UpdatePushNotificationTokenCommand,
  ): Promise<PushNotifcationTokenUpdatedView> => {
    const { user, pushNotificationToken } = command;

    user.updatePushNotificationToken(pushNotificationToken);

    await this.userRepository.save(user);

    return new PushNotifcationTokenUpdatedView(pushNotificationToken);
  };
}

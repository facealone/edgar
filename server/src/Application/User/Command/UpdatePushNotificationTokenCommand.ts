import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/Domain/User/User.entity';

export class UpdatePushNotificationTokenCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public pushNotificationToken: string;
  public user: User;
}

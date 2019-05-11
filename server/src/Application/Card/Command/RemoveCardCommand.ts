import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';

export class RemoveCardCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;

  public user: User;
}

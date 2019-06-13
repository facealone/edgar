import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RemoveRecipeCommand implements ICommand {
  @IsNotEmpty()
  @IsUUID()
  @ApiModelProperty()
  public id: string;

  public user: User;
}

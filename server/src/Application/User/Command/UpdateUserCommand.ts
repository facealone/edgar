import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserCommand implements ICommand {
  public user: User;

  @IsNotEmpty()
  @ApiModelProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public email: string;
}

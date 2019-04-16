import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginCommand implements ICommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  public password: string;
}

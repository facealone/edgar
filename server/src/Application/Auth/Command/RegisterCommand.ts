import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterCommand implements ICommand {
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

  @IsNotEmpty()
  @MinLength(10)
  @ApiModelProperty()
  public password: string;
}

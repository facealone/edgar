import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserCommand implements ICommand {
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
  @ApiModelProperty()
  public password: string;
}

import { IsNotEmpty, IsUUID, IsEmail, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';
import { UserRole } from 'src/Domain/User/UserHouse.entity';
import { ICommand } from 'src/Application/ICommand';

export class CreateVoucherCommand implements ICommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  public email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsIn([UserRole.GUEST, UserRole.OWNER])
  public role: string;

  public user: User;
}

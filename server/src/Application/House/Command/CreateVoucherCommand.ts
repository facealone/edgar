import { IsNotEmpty, IsUUID, IsEmail, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';
import { UserRole } from 'src/Domain/User/UserHouse.entity';
import { ICommand } from 'src/Application/ICommand';

export class CreateVoucherCommand implements ICommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiModelProperty()
  public house: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsIn([UserRole.GUEST, UserRole.OWNER])
  public role: string;

  public user: User;
}

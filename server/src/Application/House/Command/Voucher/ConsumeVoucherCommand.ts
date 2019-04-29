import { ICommand } from 'src/Application/ICommand';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';

export class ConsumeVoucherCommand implements ICommand {
  @IsNotEmpty()
  @ApiModelProperty()
  public code: string;

  public user: User;
}

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { House } from 'src/Domain/House/House.entity';
import { User } from 'src/Domain/User/User.entity';

export class UpdateHouseCommand implements ICommand {
  public house: House;
  public user: User;

  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
}

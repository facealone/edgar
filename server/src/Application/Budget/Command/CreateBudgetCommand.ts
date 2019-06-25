import { ICommand } from 'src/Application/ICommand';
import { IsNotEmpty, IsPositive, IsNumber, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';

export class CreateBudgetCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  public amount: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean()
  public shared: boolean;

  public user: User;
}

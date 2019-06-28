import { ICommand } from 'src/Application/ICommand';
import { IsNotEmpty, IsPositive, IsNumber, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';
import { Budget } from 'src/Domain/Budget/Budget.entity';

export class UpdateBudgetCommand implements ICommand {
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
  public budget: Budget;
}

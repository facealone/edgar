import { ICommand } from 'src/Application/ICommand';
import { IsNotEmpty, IsUUID, IsPositive, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';

export class CreateTransactionCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  public amount: number;

  @ApiModelProperty()
  public note: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public categoryId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public budgetId: string;

  public user: User;
}

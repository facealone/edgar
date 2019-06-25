import { ICommand } from 'src/Application/ICommand';
import {
  IsNotEmpty,
  IsIn,
  IsUUID,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/Domain/Budget/Transaction.entity';
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
  @IsIn([TransactionType.CASH_INFLOW, TransactionType.CASH_OUTLAY])
  public type: string;

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

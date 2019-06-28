import {
  IsUUID,
  IsNotEmpty,
  IsIn,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import {
  Transaction,
  TransactionType,
} from 'src/Domain/Budget/Transaction.entity';

export class UpdateTransactionCommand implements ICommand {
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

  public user: User;
  public transaction: Transaction;
}

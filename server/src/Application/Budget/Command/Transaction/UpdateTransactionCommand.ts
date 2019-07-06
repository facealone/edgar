import { IsUUID, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { Transaction } from 'src/Domain/Budget/Transaction.entity';

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
  @IsUUID()
  public categoryId: string;

  public user: User;
  public transaction: Transaction;
}

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class TransactionFilterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly date: string;
}

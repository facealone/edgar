import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class BudgetFilterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly date: string;
}

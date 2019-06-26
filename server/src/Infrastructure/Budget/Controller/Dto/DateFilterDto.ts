import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class DateFilterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDate()
  public readonly date: Date;
}

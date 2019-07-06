import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { PaginationDto } from 'src/Infrastructure/Common/Dto/PaginationDto';

export class TransactionFiltersDto extends PaginationDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly date: string;
}

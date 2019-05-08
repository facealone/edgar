import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CurrentHouseDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public house: string;
}

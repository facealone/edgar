import { IQuery } from 'src/Application/IQuery';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetBudgetByIdQuery implements IQuery {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}

import { IQuery } from 'src/Application/IQuery';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetHouseByIdQuery implements IQuery {
  @IsNotEmpty()
  @IsUUID()
  @ApiModelProperty()
  public id: string;
}

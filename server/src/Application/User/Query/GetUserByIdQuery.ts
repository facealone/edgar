import { IQuery } from 'src/Application/IQuery';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetUserByIdQuery implements IQuery {
  @IsNotEmpty()
  @IsUUID()
  @ApiModelProperty()
  public id: string;
}

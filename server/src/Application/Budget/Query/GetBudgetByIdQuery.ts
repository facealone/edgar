import { IQuery } from 'src/Application/IQuery';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/Domain/User/User.entity';

export class GetBudgetByIdQuery implements IQuery {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;

  public user: User;
}

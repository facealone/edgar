import { IQuery } from 'src/Application/IQuery';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class GetShoppingListSuggestionsQuery implements IQuery {
  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(3)
  public name: string;
}

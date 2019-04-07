import { ICommand } from 'src/Application/ICommand';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateHouseCommand implements ICommand {
  @IsNotEmpty()
  @ApiModelProperty()
  public name: string;
}

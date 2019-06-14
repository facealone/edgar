import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class CreateRecipeCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUrl()
  public uri: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public recipeCategory: string;

  public user: User;
}

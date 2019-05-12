import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/Domain/User/User.entity';
import { Shop } from 'src/Domain/Shop/Shop.entity';

export class UpdateShopCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
  public shop: Shop;
  public user: User;
}

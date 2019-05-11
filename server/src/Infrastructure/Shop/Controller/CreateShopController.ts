import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Post, Controller, Inject, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateShopCommand } from 'src/Application/Shop/Command/CreateShopCommand';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ShopView } from 'src/Application/Shop/View/ShopView';

@ApiBearerAuth()
@Controller('shops')
@ApiUseTags('Shop')
@UseGuards(AuthGuard())
export class CreateShopController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create shop by logged user in him current house' })
  @Post()
  public async index(
    @Body() command: CreateShopCommand,
    @LoggedUser() user: User,
  ): Promise<ShopView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}

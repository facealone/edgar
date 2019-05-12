import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  UseGuards,
  Controller,
  Inject,
  Body,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ShopView } from 'src/Application/Shop/View/ShopView';
import { UpdateShopCommand } from 'src/Application/Shop/Command/UpdateShopCommand';
import { GetShopByIdQuery } from 'src/Application/Shop/Query/GetShopByIdQuery';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { Shop } from 'src/Domain/Shop/Shop.entity';

@ApiBearerAuth()
@Controller('shops')
@ApiUseTags('Shop')
@UseGuards(AuthGuard())
export class UpdateShopController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create shop by logged user in him current house' })
  @Put('/:id')
  public async index(
    @Param() query: GetShopByIdQuery,
    @Body() command: UpdateShopCommand,
    @LoggedUser() user: User,
  ): Promise<ShopView> {
    const shop = await this.queryBus.execute(query);

    if (!(shop instanceof Shop)) {
      throw new NotFoundException();
    }

    command.user = user;
    command.shop = shop;

    return await this.commandBus.execute(command);
  }
}

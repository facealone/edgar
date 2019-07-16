import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { ShoppingListItemFiltersDto } from '../Dto/ShoppingListItemFiltersDto';
import { GetShopByIdQuery } from 'src/Application/Shop/Query/GetShopByIdQuery';
import { Shop } from 'src/Domain/Shop/Shop.entity';

@ApiBearerAuth()
@Controller('shops')
@ApiUseTags('Shop')
@UseGuards(AuthGuard())
export class GetShoppingListItemController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get shop shopping list items' })
  @Get(':id/shopping-list-items')
  public async index(
    @LoggedUser() user: User,
    @Param() query: GetShopByIdQuery,
    @Query() filters: ShoppingListItemFiltersDto,
  ) {
    if (!user.currentHouse) {
      throw new BadRequestException();
    }

    const shop = await this.queryBus.execute(query);
    if (!(shop instanceof Shop)) {
      throw new NotFoundException('shop.not.found');
    }

    // todo : fetch data
  }
}

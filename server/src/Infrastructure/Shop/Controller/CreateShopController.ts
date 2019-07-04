import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  UseGuards,
  Post,
  Controller,
  Inject,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { CreateShopCommand } from 'src/Application/Shop/Command/CreateShopCommand';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { ShopView } from 'src/Application/Shop/View/ShopView';
import { User } from 'src/Domain/User/User.entity';

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
    if (!user.currentHouse) {
      throw new BadRequestException('user.empty.current_house');
    }

    return await this.commandBus.execute(command);
  }
}

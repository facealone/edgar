import {
  Controller,
  UseGuards,
  Post,
  Body,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { CreateRecipeCommand } from 'src/Application/Recipe/Command/CreateRecipeCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';

@Controller('recipes')
@ApiUseTags('Recipe')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CreateRecipeController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  @ApiOperation({
    title: 'Create recipe by the logged user in him current house',
  })
  public async index(
    @LoggedUser() user: User,
    @Body() command: CreateRecipeCommand,
  ) {
    command.user = user;
    if (!user.currentHouse) {
      throw new BadRequestException('user.empty.current_house');
    }

    return await this.commandBus.execute(command);
  }
}

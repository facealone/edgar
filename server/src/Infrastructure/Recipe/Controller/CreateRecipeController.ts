import { Controller, UseGuards, Post, Body, Inject } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { CreateRecipeCommand } from 'src/Application/Recipe/Command/CreateRecipeCommand';
import { User } from 'src/Domain/User/User.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';

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

    return await this.commandBus.execute(command);
  }
}

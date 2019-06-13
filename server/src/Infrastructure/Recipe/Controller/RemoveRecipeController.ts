import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { Inject, Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { RemoveRecipeCommand } from 'src/Application/Recipe/Command/RemoveRecipeCommand';

@ApiBearerAuth()
@Controller('recipes')
@ApiUseTags('Recipe')
@UseGuards(AuthGuard())
export class RemoveRecipeController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Remove recipe by logged user' })
  @Delete(':id')
  public index(
    @LoggedUser() user: User,
    @Param() command: RemoveRecipeCommand,
  ): void {
    command.user = user;

    this.commandBus.execute(command);
  }
}

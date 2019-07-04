import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Controller, Inject, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { RemoveCardCommand } from 'src/Application/Card/Command/RemoveCardCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('cards')
@ApiUseTags('Card')
@UseGuards(AuthGuard())
export class RemoveCardController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Remove card by logged user' })
  @Delete(':id')
  public async index(
    @Param() command: RemoveCardCommand,
    @LoggedUser() user: User,
  ): Promise<void> {
    command.user = user;

    await this.commandBus.execute(command);
  }
}

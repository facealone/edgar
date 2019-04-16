import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Inject,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetUserByIdQuery } from 'src/Application/User/Query/GetUserByIdQuery';
import { User } from 'src/Domain/User/User.entity';

@Controller('users')
@ApiBearerAuth()
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetUserAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @Get('/:id')
  @ApiOperation({ title: 'Get user ressource' })
  async index(@Param() query: GetUserByIdQuery): Promise<object> {
    const user = await this.queryBus.execute(query);

    if (!(user instanceof User)) {
      throw new NotFoundException();
    }

    return {
      id: user.id,
      fullName: user.getFullName(),
      email: user.email,
      pushNotificationToken: user.pushNotificationToken,
    };
  }
}

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
import { UserDetailView } from 'src/Application/User/View/UserDetailView';

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
  async index(@Param() query: GetUserByIdQuery): Promise<UserDetailView> {
    const userDetailView = await this.queryBus.execute(query);

    if (!(userDetailView instanceof UserDetailView)) {
      throw new NotFoundException();
    }

    return userDetailView;
  }
}

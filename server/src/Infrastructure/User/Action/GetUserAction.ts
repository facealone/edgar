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

  @ApiOperation({ title: 'Get user ressource' })
  @Get('/:id')
  public async index(
    @Param() query: GetUserByIdQuery,
  ): Promise<UserDetailView> {
    const user = await this.queryBus.execute(query);

    if (!(user instanceof User)) {
      throw new NotFoundException();
    }

    return new UserDetailView(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
    );
  }
}

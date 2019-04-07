import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Inject,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetUserByIdQuery } from 'src/Application/User/Query/GetUserByIdQuery';
import { User } from 'src/Domain/User/User.entity';

@Controller('users')
@ApiUseTags('User')
export class GetUserAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ title: 'Get user ressource' })
  async index(@Param() query: GetUserByIdQuery): Promise<User> {
    const user = await this.queryBus.execute(query);

    if (!(user instanceof User)) {
      throw new NotFoundException();
    }

    return user;
  }
}

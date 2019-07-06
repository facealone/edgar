import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { GetUsersByHouseQuery } from 'src/Application/User/Query/GetUsersByHouseQuery';
import { User } from 'src/Domain/User/User.entity';
import { House } from 'src/Domain/House/House.entity';
import { GetUsersByHouseView } from 'src/Application/User/View/GetUsersByHouseView';
import { GetHouseByIdQuery } from 'src/Application/House/Query/GetHouseByIdQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { MemberFiltersDto } from './Dto/MemberFiltersDto';

@ApiBearerAuth()
@Controller('houses')
@ApiUseTags('House')
@UseGuards(AuthGuard())
export class GetHouseMembersController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get house members' })
  @Get(':id/members')
  public async index(
    @LoggedUser() user: User,
    @Param() query: GetHouseByIdQuery,
    @Query() filters: MemberFiltersDto,
  ): Promise<Pagination<GetUsersByHouseView>> {
    const house = await this.queryBus.execute(query);

    if (!(house instanceof House)) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(
      new GetUsersByHouseQuery(house, user, filters),
    );
  }
}

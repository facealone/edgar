import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUserDecorator';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetHouseByIdQuery } from 'src/Application/House/Query/GetHouseByIdQuery';
import { House } from 'src/Domain/House/House.entity';
import { GetVouchersByHouseQuery } from 'src/Application/House/Query/GetVouchersByHouseQuery';
import { VoucherView } from 'src/Application/House/View/Voucher/VoucherView';

@Controller('houses')
@ApiUseTags('House')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class GetHouseVouchersController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({ title: 'Get house vouchers' })
  @Get(':id/vouchers')
  public async index(
    @LoggedUser() user: User,
    @Param() query: GetHouseByIdQuery,
  ): Promise<VoucherView> {
    const house = await this.queryBus.execute(query);

    if (!(house instanceof House)) {
      throw new NotFoundException();
    }

    return await this.queryBus.execute(
      new GetVouchersByHouseQuery(house, user),
    );
  }
}

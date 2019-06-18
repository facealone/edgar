import { QueryHandler } from '@nestjs/cqrs';
import { GetVouchersByHouseQuery } from './GetVouchersByHouseQuery';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Inject, ForbiddenException } from '@nestjs/common';
import { IsMemberOfHouse } from 'src/Domain/User/IsMemberOfHouse';
import { VoucherView } from '../View/Voucher/VoucherView';

@QueryHandler(GetVouchersByHouseQuery)
export class GetVouchersByHouseQueryHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    private readonly isMemberOfHouse: IsMemberOfHouse,
  ) {}

  public execute = async (
    query: GetVouchersByHouseQuery,
  ): Promise<VoucherView[]> => {
    const { user, house } = query;

    if (false === (await this.isMemberOfHouse.isSatisfiedBy(house, user))) {
      throw new ForbiddenException('not.member.of.house');
    }

    const vouchers = await this.voucherRepository.findByHouse(house);
    const voucherViews = [];

    for (const voucher of vouchers) {
      voucherViews.push(new VoucherView(voucher.code, voucher.role));
    }

    return voucherViews;
  };
}

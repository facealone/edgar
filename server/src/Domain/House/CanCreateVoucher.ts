import { Injectable, Inject } from '@nestjs/common';
import { House } from './House.entity';
import { IVoucherRepository } from './Repository/IVoucherRepository';
import { Voucher } from './Voucher.entity';

@Injectable()
export class CanCreateVoucher {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
  ) {}

  public async isSatisfiedBy(house: House, email: string): Promise<boolean> {
    return !(
      (await this.voucherRepository.findOneByHouseAndEmail(
        house,
        email,
      )) instanceof Voucher
    );
  }
}

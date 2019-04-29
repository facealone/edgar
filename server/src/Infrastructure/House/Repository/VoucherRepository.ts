import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { House } from 'src/Domain/House/House.entity';

@Injectable()
export class VoucherRepository implements IVoucherRepository {
  constructor(
    @InjectRepository(Voucher) private readonly repository: Repository<Voucher>,
  ) {}

  public save = async (voucher: Voucher): Promise<Voucher> => {
    return await this.repository.save(voucher);
  };

  public findOneByHouseAndEmail = async (
    house: House,
    email: string,
  ): Promise<Voucher | null> => {
    return await this.repository.findOne({
      house,
      email,
    });
  };
}

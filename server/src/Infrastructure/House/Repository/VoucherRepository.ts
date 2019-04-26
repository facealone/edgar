import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/House/Voucher.entity';

@Injectable()
export class VoucherRepository implements IVoucherRepository {
  constructor(
    @InjectRepository(Voucher) private readonly repository: Repository<Voucher>,
  ) {}

  save = async (voucher: Voucher): Promise<Voucher> => {
    return await this.repository.save(voucher);
  };
}

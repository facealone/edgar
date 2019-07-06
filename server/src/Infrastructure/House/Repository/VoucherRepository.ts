import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVoucherRepository } from 'src/Domain/House/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/House/Voucher.entity';
import { House } from 'src/Domain/House/House.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

@Injectable()
export class VoucherRepository implements IVoucherRepository {
  constructor(
    @InjectRepository(Voucher)
    private readonly repository: Repository<Voucher>,
  ) {}

  public save = async (voucher: Voucher): Promise<Voucher> => {
    return await this.repository.save(voucher);
  };

  public findOneByCode = async (code: string): Promise<Voucher | null> => {
    return await this.repository
      .createQueryBuilder('voucher')
      .select(['voucher.code', 'house.id'])
      .where('voucher.code = :code', { code })
      .innerJoin('voucher.house', 'house')
      .getOne();
  };

  public findByHouse = async (
    house: House,
    page: number = 1,
  ): Promise<[Voucher[], number]> => {
    return await this.repository
      .createQueryBuilder('voucher')
      .select(['voucher.code', 'voucher.username', 'voucher.role'])
      .where('voucher.house = :house', { house: house.id })
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .limit(MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  };

  public remove = async (voucher: Voucher): Promise<void> => {
    await this.repository.remove(voucher);
  };
}

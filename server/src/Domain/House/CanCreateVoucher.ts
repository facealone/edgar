import { Injectable } from '@nestjs/common';
import { House } from './House.entity';

@Injectable()
export class CanCreateVoucher {
  async isSatisfiedBy(house: House, email: string): Promise<boolean> {
    return true;
  }
}

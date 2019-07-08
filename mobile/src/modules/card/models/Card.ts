import { Owner } from '../../user/models/Owner';

export class Card {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly barCode: string,
    public readonly owner: Owner,
  ) {}
}

export interface ICard {
  id: string;
  name: string;
  barCode: string;
}

export class Card implements ICard {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly barCode: string,
  ) {}
}

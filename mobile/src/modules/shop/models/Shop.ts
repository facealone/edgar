export interface IShop {
  id: string;
  name: string;
  numberOfItems: number;
}

export class Shop implements IShop {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly numberOfItems: number = 0,
  ) {}
}

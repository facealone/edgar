export interface IShop {
  id: string;
  name: string;
}

export class Shop implements IShop {
  constructor(public readonly id: string, public readonly name: string) {}
}

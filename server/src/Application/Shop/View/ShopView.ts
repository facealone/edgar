export class ShopView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly numberOfItems: number = 0,
  ) {}
}

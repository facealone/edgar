export class Shop {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly numberOfItems: number = 0,
  ) {}
}

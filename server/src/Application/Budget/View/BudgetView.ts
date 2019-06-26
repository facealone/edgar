export class BudgetView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: number = 0,
    public readonly balance: number = 0,
    public readonly shared: boolean,
  ) {}
}

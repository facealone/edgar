export class BudgetView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly shared: boolean,
  ) {}
}

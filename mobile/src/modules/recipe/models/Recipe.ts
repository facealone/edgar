export interface IRecipe {
  id: string;
  name: string;
  uri: string;
}

export class Recipe implements IRecipe {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uri: string,
  ) {}
}

export interface IRecipeCategory {
  id: string;
  name: string;
}

export class RecipeCategory implements IRecipeCategory {
  constructor(public readonly id: string, public readonly name: string) {}
}

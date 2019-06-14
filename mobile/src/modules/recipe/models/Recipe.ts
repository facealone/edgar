import { IOwner } from '../../user/models/Owner';

export interface IRecipe {
  id: string;
  name: string;
  uri: string;
  owner: IOwner;
}

export class Recipe implements IRecipe {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uri: string,
    public readonly owner: IOwner,
  ) {}
}

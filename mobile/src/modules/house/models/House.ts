export interface IHouse {
  id: string;
  name: string;
}

export class House implements IHouse {
  constructor(public readonly id: string, public readonly name: string) {}
}

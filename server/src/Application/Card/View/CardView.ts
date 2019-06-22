import { OwnerView } from 'src/Application/User/View/OwnerView';

export class CardView {
  constructor(
    public id: string,
    public name: string,
    public barCode: string,
    public readonly owner: OwnerView,
  ) {}
}

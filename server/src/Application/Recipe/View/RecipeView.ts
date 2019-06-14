import { User } from 'src/Domain/User/User.entity';

export class RecipeView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uri: string,
    public readonly user: UserNameView,
  ) {}
}

import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/User/User.entity';
import { RecipeFiltersDto } from 'src/Infrastructure/Recipe/Controller/Dto/RecipeFiltersDto';

export class GetRecipesByHouseQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly filters: RecipeFiltersDto,
  ) {}
}

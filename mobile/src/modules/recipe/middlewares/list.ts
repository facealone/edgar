import { loading, success, errors } from '../actions/list';
import { Recipe } from '../models/Recipe';
import { Owner } from '../../user/models/Owner';
import { RecipeCategory } from '../models/RecipeCategory';
import { Pagination } from '../../common/models/Pagination';

export const listRecipes = (page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/recipes', {
        page,
      });
      const payload = response.data;
      const recipes = [];

      for (const recipe of payload.items) {
        const { owner, category } = recipe;

        recipes.push(
          new Recipe(
            recipe.id,
            recipe.name,
            recipe.uri,
            new Owner(owner.firstName, owner.lastName),
            new RecipeCategory(category.id, category.name),
          ),
        );
      }

      dispatch(
        success(
          new Pagination<Recipe>(
            recipes,
            payload.pageCount,
            payload.totalItems,
          ),
        ),
      );
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

import { loading, success, errors } from '../actions/list';
import { Recipe } from '../models/Recipe';
import { Owner } from '../../user/models/Owner';
import { RecipeCategory } from '../models/RecipeCategory';

export const listRecipes = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/recipes');
      const recipes = [];

      for (const recipe of response.data) {
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

      dispatch(success(recipes));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

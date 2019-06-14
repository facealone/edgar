import { loading, success, errors } from '../actions/categories';
import { RecipeCategory } from '../models/RecipeCategory';

export const listRecipeCategories = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('/recipes-categories');
      const recipeCategories = [];

      for (const recipeCategory of response.data) {
        recipeCategories.push(
          new RecipeCategory(recipeCategory.id, recipeCategory.name),
        );
      }

      dispatch(success(recipeCategories));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

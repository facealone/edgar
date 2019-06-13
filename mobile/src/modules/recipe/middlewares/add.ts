import { loading, success, errors } from '../actions/add';
import { Recipe } from '../models/Recipe';
import { IRecipeForm } from '../types/add';

export const addRecipe = (payload: IRecipeForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('recipes', payload);
      const recipe = response.data;

      dispatch(success(new Recipe(recipe.id, recipe.name, recipe.uri)));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

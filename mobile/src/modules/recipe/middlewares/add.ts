import { loading, success, errors } from '../actions/add';
import { Recipe } from '../models/Recipe';
import { IRecipeForm } from '../types/add';
import { Owner } from '../../user/models/Owner';
import { RecipeCategory } from '../models/RecipeCategory';

export const addRecipe = (payload: IRecipeForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('recipes', payload);
      const recipe = response.data;
      const { owner, category } = recipe;

      dispatch(
        success(
          new Recipe(
            recipe.id,
            recipe.name,
            recipe.uri,
            new Owner(owner.firstName, owner.lastName),
            new RecipeCategory(category.id, category.name),
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

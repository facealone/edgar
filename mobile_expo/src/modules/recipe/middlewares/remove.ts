import { loading, success, errors } from '../actions/remove';

export const removeRecipe = (id: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));
    try {
      await axios.delete(`recipes/${id}`);
      dispatch(success(id));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

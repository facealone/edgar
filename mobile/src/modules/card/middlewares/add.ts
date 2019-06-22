import { loading, success, errors } from '../actions/add';
import { Card } from '../models/Card';
import { Owner } from '../../user/models/Owner';

export const addCard = (name: string, barCode: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('cards', { name, barCode });
      const card = response.data;

      dispatch(
        success(
          new Card(
            card.id,
            card.name,
            card.barCode,
            new Owner(card.owner.firstName, card.owner.lastName),
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

import { loading, success, errors } from '../actions/list';
import { Card } from '../models/Card';

export const listCards = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/cards');
      const cards = [];

      for (const card of response.data) {
        cards.push(new Card(card.id, card.name, card.barCode));
      }

      dispatch(success(cards));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(true));
    }
  };
};

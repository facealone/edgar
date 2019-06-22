import { loading, success, errors } from '../actions/list';
import { Card } from '../models/Card';
import { Owner } from '../../user/models/Owner';

export const listCards = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/cards');
      const cards = [];

      for (const card of response.data) {
        cards.push(
          new Card(
            card.id,
            card.name,
            card.barCode,
            new Owner(card.owner.firstName, card.owner.lastName),
          ),
        );
      }

      dispatch(success(cards));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

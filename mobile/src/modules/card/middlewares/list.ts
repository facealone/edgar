import { loading, success, errors } from '../actions/list';
import { Card } from '../models/Card';
import { Owner } from '../../user/models/Owner';
import { Pagination } from '../../common/models/Pagination';

export const listCards = (page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/cards', {
        page,
      });
      const { items, pageCount, totalItems } = response.data;
      const cards = [];

      for (const card of items) {
        cards.push(
          new Card(
            card.id,
            card.name,
            card.barCode,
            new Owner(card.owner.firstName, card.owner.lastName),
          ),
        );
      }

      dispatch(success(new Pagination<Card>(cards, pageCount, totalItems)));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

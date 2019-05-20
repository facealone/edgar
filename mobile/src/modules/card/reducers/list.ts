import { ICardListState, ICardListActionTypes } from '../types/list';

const initialState: ICardListState = {
  loading: false,
  payload: [],
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: ICardListActionTypes,
): ICardListState => {
  return state;
};

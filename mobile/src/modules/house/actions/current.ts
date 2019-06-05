import { HOUSE_CURRENT_SUCCESS } from '../constants/current';
import { IHouse } from '../models/House';
import { ICurrentHouseSuccessAction } from '../types/current';

export const success = (payload: IHouse): ICurrentHouseSuccessAction => {
  return {
    type: HOUSE_CURRENT_SUCCESS,
    payload,
  };
};

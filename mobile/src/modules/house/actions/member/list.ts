import {
  HOUSE_MEMBER_LIST_ERROR,
  HOUSE_MEMBER_LIST_SUCCESS,
  HOUSE_MEMBER_LIST_LOADING,
  HOUSE_MEMBER_LIST_RESET,
} from '../../constants/member/list';
import {
  IHouseMemberListSuccessAction,
  IHouseMemberListLoadingAction,
  IHouseMemberListErrorAction,
  IHouseMemberListResetAction,
} from '../../types/member/list';
import { IMember } from '../../models/Member';
import { IError } from '../../../common/models/Error';

export const success = (payload: IMember[]): IHouseMemberListSuccessAction => {
  return {
    type: HOUSE_MEMBER_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IHouseMemberListLoadingAction => {
  return {
    type: HOUSE_MEMBER_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: IError[]): IHouseMemberListErrorAction => {
  return {
    type: HOUSE_MEMBER_LIST_ERROR,
    errors,
  };
};

export const reset = (): IHouseMemberListResetAction => {
  return {
    type: HOUSE_MEMBER_LIST_RESET,
  };
};

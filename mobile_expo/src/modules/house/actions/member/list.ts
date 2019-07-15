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
import { Member } from '../../models/Member';
import { Error } from '../../../common/models/Error';
import { Pagination } from '../../../common/models/Pagination';

export const success = (
  payload: Pagination<Member>,
): IHouseMemberListSuccessAction => {
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

export const errors = (errors: Error[]): IHouseMemberListErrorAction => {
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

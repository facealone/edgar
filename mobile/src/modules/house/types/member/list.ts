import {
  HOUSE_MEMBER_LIST_SUCCESS,
  HOUSE_MEMBER_LIST_LOADING,
  HOUSE_MEMBER_LIST_ERROR,
  HOUSE_MEMBER_LIST_RESET,
} from '../../constants/member/list';
import { IState } from '../../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../../common/types/actions';
import { IMember } from '../../models/Member';

export interface IHouseMemberListState extends IState {
  payload: IMember[];
}

export interface IHouseMemberListSuccessAction {
  type: typeof HOUSE_MEMBER_LIST_SUCCESS;
  payload: IMember[];
}

export interface IHouseMemberListLoadingAction extends ILoadingAction {
  type: typeof HOUSE_MEMBER_LIST_LOADING;
}

export interface IHouseMemberListErrorAction extends IErrorAction {
  type: typeof HOUSE_MEMBER_LIST_ERROR;
}

export interface IHouseMemberListResetAction {
  type: typeof HOUSE_MEMBER_LIST_RESET;
}

export type IHouseMemberListActionTypes =
  | IHouseMemberListSuccessAction
  | IHouseMemberListLoadingAction
  | IHouseMemberListErrorAction
  | IHouseMemberListResetAction;

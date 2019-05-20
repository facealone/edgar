import {
  HOUSE_MEMBER_LIST_SUCCESS,
  HOUSE_MEMBER_LIST_LOADING,
  HOUSE_MEMBER_LIST_ERROR,
  HOUSE_MEMBER_LIST_RESET,
} from '../../constants/member/list';
import { IListState } from '../../../../types/states';
import {
  IListSuccessAction,
  ILoadingAction,
  IErrorAction,
} from '../../../../types/actions';

export interface IHouseMemberListState extends IListState {}

export interface IHouseMemberListSuccessAction extends IListSuccessAction {
  type: typeof HOUSE_MEMBER_LIST_SUCCESS;
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

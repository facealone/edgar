import { errors, loading, success } from '../../actions/member/list';
import { Member } from '../../models/Member';
import { Pagination } from '../../../common/models/Pagination';

export const listMembers = (house: string, page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(`houses/${house}/members?page=${page}`);
      const { items, pageCount, totalItems } = response.data;
      const members = [];

      for (const member of items) {
        members.push(
          new Member(
            member.id,
            member.firstName,
            member.lastName,
            member.email,
            member.role,
          ),
        );
      }

      dispatch(success(new Pagination<Member>(members, pageCount, totalItems)));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

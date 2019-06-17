import { errors, loading, success } from '../../actions/member/list';
import { Member } from '../../models/Member';

export const listMembers = (house: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(`houses/${house}/members`);
      const members = [];

      for (const member of response.data) {
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

      dispatch(success(members));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

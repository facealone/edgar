import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Body,
  Left,
  Icon,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { commonStyles } from '../../../../theme/common';
import i18n from '../../../../i18n';
import { IHouseMemberListState } from '../../types/member/list';
import { listMembers } from '../../middlewares/member/list';
import { reset } from '../../actions/member/list';

interface IProps {
  members: IHouseMemberListState;
  house: string;
  listMembers(house: string): any;
  reset(): any;
}

class MemberList extends React.Component<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    const { house, listMembers } = this.props;

    listMembers(house);
  };

  render = () => {
    const { members } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>
            {i18n.t('house.show.members')} ({members.payload.length})
          </Text>
        </Separator>
        {members.payload.map(member => (
          <ListItem icon key={member.id}>
            <Left>
              <Icon name={'ios-person'} style={commonStyles.darkText} />
            </Left>
            <Body>
              <Text>{`${member.firstName} ${member.lastName}`}</Text>
              <Text style={commonStyles.listHelper}>{`${member.email} - ${
                member.role
              }`}</Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      members: state.house.member.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listMembers, reset }, dispatch),
    };
  },
)(MemberList);

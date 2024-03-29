import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  ListItem,
  Left,
  Icon,
  Body,
  Separator,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { logout } from '../../auth/actions/authentication';
import {
  IAuthenticationLogoutAction,
  IAuthenticationState,
} from '../../auth/types/authentication';
import { MAIN_COLOR } from '../../../theme/colors';
import i18n from '../../../i18n';
import { commonStyles } from '../../../theme/common';

interface IProps {
  authentication: IAuthenticationState;
  navigation: any;
  logout(): IAuthenticationLogoutAction;
}

class SettingsScreen extends React.Component<IProps> {
  componentDidUpdate = () => {
    const { authentication, navigation } = this.props;

    if (false === authentication.authenticated) {
      navigation.navigate('Logout');
    }
  };

  render = () => {
    const { navigation } = this.props;

    return (
      <Content style={commonStyles.content}>
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>
            {i18n.t('settings.menu.main.title')}
          </Text>
        </Separator>
        <ListItem icon onPress={() => navigation.navigate('HouseList')}>
          <Left>
            <Icon style={{ color: MAIN_COLOR }} name={'ios-switch'} />
          </Left>
          <Body>
            <Text>{i18n.t('settings.menu.main.houses')}</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon style={{ color: MAIN_COLOR }} name={'heart'} />
          </Left>
          <Body>
            <Text>{i18n.t('settings.menu.main.recommend')}</Text>
          </Body>
        </ListItem>
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>
            {i18n.t('settings.menu.user.title')}
          </Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Icon style={{ color: MAIN_COLOR }} name={'person'} />
          </Left>
          <Body>
            <Text>{i18n.t('settings.menu.user.personalInformation')}</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon style={{ color: MAIN_COLOR }} name={'ios-key'} />
          </Left>
          <Body>
            <Text>{i18n.t('settings.menu.user.editPassword')}</Text>
          </Body>
        </ListItem>
        <ListItem icon onPress={() => this.props.logout()}>
          <Left>
            <Icon style={{ color: MAIN_COLOR }} name={'ios-log-out'} />
          </Left>
          <Body>
            <Text>{i18n.t('settings.menu.user.logout')}</Text>
          </Body>
        </ListItem>
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      authentication: state.auth.authentication,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ logout }, dispatch),
    };
  },
)(SettingsScreen);

import React from 'react';
import { connect } from 'react-redux';
import { Content, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { logout } from '../../auth/actions/authentication';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';

interface IProps {
  authenticated: boolean;
  navigation: any;
  logout(): IAuthenticationLogoutAction;
}

class ProfilScreen extends React.PureComponent<IProps> {
  componentDidUpdate = () => {
    const { authenticated, navigation } = this.props;

    if (false === authenticated) {
      navigation.navigate('Logout');
    }
  };

  render = () => {
    return (
      <Content>
        <Text>Profil</Text>
        <Button onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('HouseAdd')}>
          <Text>Add house</Text>
        </Button>
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      authenticated: state.auth.authentication.authenticated,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ logout }, dispatch),
    };
  },
)(ProfilScreen);

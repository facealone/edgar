import React from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { Font } from 'expo';
import { Container } from 'native-base';
import { createRootNavigator } from '../../../libraries/navigator';
import { IAuthenticationState } from '../../auth/types/authentication';

interface IProps {
  auth: IAuthenticationState;
}

class Layout extends React.PureComponent<IProps> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ ready: true });
  }

  render() {
    const { auth } = this.props;
    const RootNavigator = createRootNavigator(auth);

    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <Container>
        <RootNavigator />
      </Container>
    );
  }
}

export default connect(state => {
  return {
    auth: state.auth.authentication,
  };
})(Layout);

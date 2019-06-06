import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Container } from 'native-base';
import Navigation from '../../../navigation';

interface IState {
  ready: boolean;
}

export default class Layout extends React.Component<{}, IState> {
  state = {
    ready: false,
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      Roboto: require('../../../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ ready: true });
  };

  render = () => {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Navigation />
      </Container>
    );
  };
}

import React from 'react';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
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
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
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

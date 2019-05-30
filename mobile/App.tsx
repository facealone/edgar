import React from 'react';
import { AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { createAppContainer } from 'react-navigation';
import { Container } from 'native-base';
import { useScreens } from 'react-native-screens';
import configureStore from './src/store';
import { AppNavigator } from './src/libraries/navigator';

useScreens();

const { store, persistor } = configureStore();
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
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
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <AppContainer />
          </Container>
        </PersistGate>
      </Provider>
    );
  }
}

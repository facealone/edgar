import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { useScreens } from 'react-native-screens';
import configureStore from './src/store';
import Layout from './src/modules/common/components/Layout';

useScreens();

const { store, persistor } = configureStore();

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    );
  }
}

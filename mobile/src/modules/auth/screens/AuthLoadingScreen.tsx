import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import AppEntryPoint from '../AppEntryPoint';
import { IHouse } from '../../house/models/House';

interface IProps {
  authenticated: boolean;
  currentHouse: IHouse;
  navigation: any;
}

class AuthLoadingScreen extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.init();
  }

  init = () => {
    const { navigation, authenticated, currentHouse } = this.props;

    navigation.navigate(AppEntryPoint.get(authenticated, currentHouse));
  };

  render = () => {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };
}

export default connect(state => {
  return {
    authenticated: state.auth.authentication.authenticated,
    currentHouse: state.house.current.payload,
  };
})(AuthLoadingScreen);

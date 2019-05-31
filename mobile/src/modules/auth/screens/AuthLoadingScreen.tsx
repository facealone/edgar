import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { IAuthenticationState } from '../types/authentication';
import AppEntryPoint from '../AppEntryPoint';

interface IProps {
  auth: IAuthenticationState;
  navigation: any;
}

class AuthLoadingScreen extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);

    this.init();
  }

  init = () => {
    const { navigation, auth } = this.props;

    navigation.navigate(AppEntryPoint.getByAuthenticationState(auth));
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
    auth: state.auth.authentication,
  };
})(AuthLoadingScreen);

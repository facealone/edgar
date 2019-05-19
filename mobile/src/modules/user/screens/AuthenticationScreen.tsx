import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthenticationForm } from '../components/forms/AuthenticationForm';

export class AuthenticationScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Se connecter',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <AuthenticationForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

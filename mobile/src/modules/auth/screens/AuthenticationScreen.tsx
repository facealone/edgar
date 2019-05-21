import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthenticationForm from '../components/authentication/AuthenticationForm';

export class AuthenticationScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Se connecter',
  };

  render = () => {
    return (
      <View style={styles.container}>
        <Text>Te revoilà, saisis ton adresse email et ton mot de passe.</Text>
        <AuthenticationForm />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

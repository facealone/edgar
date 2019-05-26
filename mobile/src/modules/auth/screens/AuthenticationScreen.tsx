import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
import i18n from '../../../i18n';

export class AuthenticationScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('auth.login'),
  };

  render = () => {
    return (
      <View style={styles.container}>
        <Text>{i18n.t('auth.introduction')}</Text>
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

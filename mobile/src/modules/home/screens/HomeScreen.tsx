import React from 'react';
import { Content, Text, Button, Thumbnail } from 'native-base';
import i18n from '../../../i18n';
import Logo from '../../../../assets/logo.png';
import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../../theme/colors';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <Content style={styles.container}>
      <Thumbnail source={Logo} style={styles.logo} />
      <Text style={styles.slogan}>{i18n.t('home.slogan')}</Text>
      <Button style={styles.createAccount}>
        <Text
          style={styles.createAccountText}
          onPress={() => navigation.navigate('Registration')}
        >
          {i18n.t('auth.registration.title')}
        </Text>
      </Button>
      <Button
        transparent
        onPress={() => navigation.navigate('Authentication')}
        style={styles.login}
      >
        <Text uppercase={false} style={styles.loginText}>
          {i18n.t('home.goToLogin')}
        </Text>
      </Button>

      <Text style={styles.cgu}>{i18n.t('home.cgu')}</Text>
    </Content>
  );
};

HomeScreen.navigationOptions = { header: null };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#686868',
    padding: 10,
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    lineHeight: 16,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
  },
  createAccount: {
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
    color: MAIN_COLOR,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  createAccountText: {
    color: MAIN_COLOR,
  },
  login: {
    margin: 15,
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  cgu: {
    justifyContent: 'flex-end',
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'center',
    color: '#ccc',
  },
});

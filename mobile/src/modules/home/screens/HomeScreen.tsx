import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, Button, Thumbnail } from 'native-base';
import i18n from '../../../i18n';
import Logo from '../../../../assets/logo.png';
import { MAIN_COLOR } from '../../../theme/colors';

export class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;

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
        <Text
          onPress={() => navigation.navigate('Authentication')}
          style={styles.login}
        >
          {i18n.t('home.goToLogin')}
        </Text>

        <Text style={styles.cgu}>{i18n.t('home.cgu')}</Text>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#686868',
    padding: 10,
    flex: 1,
  },
  logo: {
    width: 190,
    height: 190,
    alignSelf: 'center',
    marginTop: 40,
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
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
    margin: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    alignSelf: 'center',
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

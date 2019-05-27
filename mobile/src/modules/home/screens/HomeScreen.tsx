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
    return (
      <Content style={styles.container}>
        <Thumbnail source={Logo} style={styles.logo} />
        <Text style={styles.slogan}>{i18n.t('home.slogan')}</Text>
        <Button style={styles.createAccount}>
          <Text style={styles.createAccountText}>
            {i18n.t('home.goToAccountCreation')}
          </Text>
        </Button>
        <Text
          onPress={() => this.props.navigation.navigate('Authentication')}
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
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginTop: 50,
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
    color: '#fff',
    padding: 10,
    alignSelf: 'center',
  },
  createAccount: {
    marginTop: 30,
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'center',
    color: '#ccc',
  },
});

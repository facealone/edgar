import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Content } from 'native-base';
import i18n from '../../../i18n';
import RegistrationForm from '../components/RegistrationForm';

export default class RegistrationScreen extends React.PureComponent {
  static navigationOptions = {
    title: i18n.t('auth.registration.title'),
  };

  render = () => {
    return (
      <Content>
        <Text style={styles.intro}>
          {i18n.t('auth.registration.introduction')}
        </Text>
        <RegistrationForm onSubmit={() => {}} loading={false} />
      </Content>
    );
  };
}

const styles = StyleSheet.create({
  intro: { margin: 10 },
});

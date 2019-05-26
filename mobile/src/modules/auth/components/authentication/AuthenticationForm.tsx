import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { reduxForm } from 'redux-form';
import i18n from '../../../../i18n';

interface Props {
  loading: boolean;
  handleSubmit(): any;
}

class AuthenticationForm extends React.PureComponent<Props> {
  render = () => {
    const { loading, handleSubmit } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Button
            disabled={loading}
            title={i18n.t('auth.login')}
            onPress={handleSubmit}
            color={'#686868'}
          />
        </TouchableOpacity>
        <Text>{i18n.t('auth.form.forgotPassword')}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default reduxForm({
  form: 'authentication',
})(AuthenticationForm);

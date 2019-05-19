import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import t, { form } from 'tcomb-form-native';

type Props = {
  loading: boolean;
  errors: [];
};

class AuthenticationForm extends React.Component<Props> {
  private handleSubmit = () => {
    const values = this.form.getValue();
  };

  private initForm = () => {
    const { loading } = this.props;

    const authenticationStruct = t.struct({
      email: t.String,
      password: t.String,
    });

    const options = {
      fields: {
        email: {
          label: 'Adresse email',
          autoFocus: true,
          editable: !loading,
          keyboardType: 'email-address',
        },
        password: {
          label: 'Mot de passe',
          password: true,
          editable: !loading,
          secureTextEntry: true,
        },
      },
    };

    return { authenticationStruct, options };
  };

  public render = () => {
    const { errors, loading } = this.props;
    const { authenticationStruct, options } = this.initForm();

    return (
      <View style={styles.container}>
        {errors.length > 0 && <Text>Error !!</Text>}
        <form.Form
          ref={(ref: any) => {
            this.form = ref;
          }}
          type={authenticationStruct}
          options={options}
        />

        <TouchableOpacity>
          <Button
            disabled={loading}
            title={'Se connecter'}
            onPress={this.handleSubmit}
            color={'#686868'}
          />
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default connect(state => {
  return {
    loading: state.user.authentication.loading,
    errors: state.user.authentication.errors,
  };
})(AuthenticationForm);

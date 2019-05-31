import React, { Fragment } from 'react';
import { Text, Input as BaseInput, Label, Item } from 'native-base';
import { StyleSheet } from 'react-native';

export const Input = ({
  input,
  secureTextEntry,
  returnKeyType,
  keyboardType,
  textContentType,
  autoCapitalize,
  label,
  meta: { touched, error },
}) => {
  let displayError = false;

  if (touched && error) {
    displayError = true;
  }

  return (
    <Fragment>
      <Item stackedLabel error={displayError}>
        <Label>{label}</Label>
        <BaseInput
          {...input}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          clearButtonMode={'while-editing'}
        />
      </Item>
      {displayError && <Text style={styles.error}>{error}</Text>}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  error: {
    paddingLeft: 15,
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
  },
});

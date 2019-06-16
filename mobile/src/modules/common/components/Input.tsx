import React, { Fragment } from 'react';
import { Text, Input as BaseInput, Label, Item } from 'native-base';
import { StyleSheet } from 'react-native';

export const Input = ({
  input,
  secureTextEntry,
  returnKeyType,
  autoFocus,
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
          name={input.name}
          onChange={input.onChange}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus ? true : false}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
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

import React, { Fragment } from 'react';
import { Text, Picker, Label, Item } from 'native-base';
import { StyleSheet } from 'react-native';

export const PickerInput = ({
  input: { onChange, value, ...inputProps },
  label,
  children,
  meta: { touched, error },
}) => {
  let displayError = false;

  if (touched && error) {
    displayError = true;
  }
  console.log(inputProps);
  return (
    <Fragment>
      <Item stackedLabel error={displayError}>
        <Label>{label}</Label>
        <Picker
          mode={'dropdown'}
          selectedValue={value}
          onValueChange={value => onChange(value)}
          {...inputProps}
        >
          {children}
        </Picker>
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

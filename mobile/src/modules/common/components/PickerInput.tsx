import React from 'react';
import { Text, Picker, Label, Item } from 'native-base';
import { StyleSheet } from 'react-native';

export const PickerInput = ({
  input: { onChange, value, ...inputProps },
  children,
  label,
  meta: { touched, error },
  ...pickerProps
}) => {
  let displayError = false;

  if (touched && error) {
    displayError = true;
  }

  return (
    <>
      <Item error={displayError}>
        <Picker
          mode={'dropdown'}
          selectedValue={value}
          onValueChange={value => onChange(value)}
          {...inputProps}
          {...pickerProps}
        >
          {children}
        </Picker>
      </Item>
      {displayError && <Text style={styles.error}>{error}</Text>}
    </>
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

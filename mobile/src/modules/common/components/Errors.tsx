import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../../../i18n';
import { IError } from '../models/Error';

type Props = {
  errors: IError[];
};

export class Errors extends React.PureComponent<Props> {
  render = () => {
    const { errors } = this.props;

    return (
      <View>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <Text key={key} style={styles.error}>
              {i18n.t(error.message)}
            </Text>
          ))}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

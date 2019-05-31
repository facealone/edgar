import React from 'react';
import { Button, Text, Spinner } from 'native-base';
import { commonStyles } from '../../../theme/common';

interface IProps {
  loading: boolean;
  label: string;
  handleSubmit(): any;
}

export class SubmitButton extends React.PureComponent<IProps> {
  render = () => {
    const { loading, label, handleSubmit } = this.props;

    return (
      <Button
        disabled={loading}
        style={commonStyles.submitButton}
        onPress={handleSubmit}
      >
        {loading && <Spinner color={'#fff'} />}
        <Text>{label}</Text>
      </Button>
    );
  };
}

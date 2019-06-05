import React from 'react';
import { Content, Text } from 'native-base';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'PLop',
  };

  render = () => {
    return (
      <Content>
        <Text>Shops</Text>
      </Content>
    );
  };
}

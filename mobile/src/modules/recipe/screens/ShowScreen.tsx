import React from 'react';
import { Content } from 'native-base';
import { WebView } from 'react-native';
import RemoveButton from '../components/RemoveButton';

interface IProps {
  navigation: any;
}

class ShowScreen extends React.PureComponent<IProps> {
  render = () => {
    const { uri } = this.props.navigation.state.params;

    return (
      <Content contentContainerStyle={{ flex: 1 }}>
        <WebView
          source={{
            uri,
          }}
          javaScriptEnabled
        />
      </Content>
    );
  };
}

ShowScreen.navigationOptions = ({ navigation }: any) => {
  const { name, id } = navigation.state.params;

  return {
    title: name,
    headerRight: <RemoveButton navigation={navigation} id={id} />,
  };
};

export default ShowScreen;

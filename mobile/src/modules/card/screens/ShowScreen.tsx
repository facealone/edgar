import React from 'react';
import { Content, Text, Card, CardItem, Body } from 'native-base';
import DeviceBrightness from 'react-native-device-brightness';
import Barcode from 'react-native-barcode-builder';
import RemoveButton from '../components/RemoveButton';
import { MAIN_COLOR } from '../../../theme/colors';
import i18n from '../../../i18n';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../../theme/common';

interface IProps {
  navigation: any;
}

interface IState {
  brightness: number;
}

class ShowScreen extends React.PureComponent<IProps, IState> {
  state = {
    brightness: 0.5,
  };

  componentDidMount = async () => {
    const brightness = await DeviceBrightness.getBrightnessLevel();
    this.setState({ brightness });
    DeviceBrightness.setBrightnessLevel(1);
  };

  componentWillUnmount = async () => {
    await DeviceBrightness.setBrightnessLevel((this.state.brightness);
  };

  render = () => {
    const { name, barCode } = this.props.navigation.state.params;

    return (
      <Content style={commonStyles.content} padder>
        <Card>
          <CardItem header bordered>
            <Text style={styles.header}>{name}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Barcode style={styles.barCode} value={barCode} />
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text style={styles.footer}>
              {i18n.t('card.show.footer', { barCode })}
            </Text>
          </CardItem>
        </Card>
      </Content>
    );
  };
}

const styles = StyleSheet.create({
  header: {
    color: MAIN_COLOR,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: 19,
  },
  barCode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    color: MAIN_COLOR,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

ShowScreen.navigationOptions = ({ navigation }: any) => {
  const { name, id } = navigation.state.params;

  return {
    title: name,
    headerRight: <RemoveButton navigation={navigation} id={id} />,
  };
};

export default ShowScreen;

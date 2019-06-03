import React, { Fragment } from 'react';
import { Content, Text, Button, Icon, Card, CardItem, Body } from 'native-base';
import Barcode from 'react-native-barcode-builder';
import { commonStyles } from '../../../theme/common';
import { Permissions, Brightness } from 'expo';

interface IProps {
  navigation: any;
}

interface IState {
  brightness: number;
}

export default class ShowScreen extends React.PureComponent<IProps, IState> {
  state = {
    brightness: 100,
  };

  static navigationOptions = ({ navigation }: any) => {
    const { state } = navigation;

    return {
      title: state.params.name,
      headerRight: (
        <Fragment>
          <Button transparent>
            <Icon
              name={'remove-circle-outline'}
              style={commonStyles.headerIcon}
            />
          </Button>
          <Button transparent>
            <Icon name={'share'} style={commonStyles.headerIcon} />
          </Button>
        </Fragment>
      ),
    };
  };

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);

    const { status } = await Permissions.getAsync(
      Permissions.SYSTEM_BRIGHTNESS,
    );

    if ('granted' === status) {
      this.setState({
        brightness: await Brightness.getSystemBrightnessAsync(),
      });
      Brightness.setSystemBrightnessAsync(100);
    }
  };

  componentWillUnmount = () => {
    Brightness.setSystemBrightnessAsync(this.state.brightness);
  };

  render = () => {
    const { state } = this.props.navigation;

    return (
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>{state.params.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Barcode value={state.params.barCode} />
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>{state.params.barCode}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  };
}

import React from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Body,
  Button,
  Icon,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { commonStyles } from '../../../theme/common';
import i18n from '../../../i18n';
import { ICurrentHouseState } from '../types/current';
import { changeCurrentHouse } from '../middlewares/current';

interface IProps {
  navigation: any;
  changeCurrentHouse(house: string): any;
  current: ICurrentHouseState;
}

class ShowScreen extends React.Component<IProps> {
  render = () => {
    const { navigation, current, changeCurrentHouse } = this.props;
    const { name, id } = navigation.state.params;

    return (
      <Content style={commonStyles.content}>
        {current.payload.id !== id && (
          <Button
            style={commonStyles.submitButton}
            iconLeft
            small
            onPress={() => changeCurrentHouse(id)}
          >
            <Icon name={'ios-log-in'} />
            <Text>
              {i18n.t('house.show.loginOnHouse', {
                house: name,
              })}
            </Text>
          </Button>
        )}
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>
            {i18n.t('house.show.members')}
          </Text>
        </Separator>
        <ListItem>
          <Body>
            <Text>Mathieu MARCHOIS</Text>
            <Text style={commonStyles.listHelper}>ROLE_OWNER</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Body>
            <Text>Hélène MAITRE</Text>
          </Body>
        </ListItem>
      </Content>
    );
  };
}

ShowScreen.navigationOptions = ({ navigation }: any) => {
  const { name, id } = navigation.state.params;

  return {
    title: name,
    //headerRight: <RemoveButton navigation={navigation} id={id} />,
  };
};

export default connect(
  state => {
    return {
      current: state.house.current,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ changeCurrentHouse }, dispatch),
    };
  },
)(ShowScreen);

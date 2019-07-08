import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import {
  Content,
  Text,
  ListItem,
  Icon,
  Body,
  Right,
  Fab,
  Separator,
} from 'native-base';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import { commonStyles } from '../../../theme/common';
import { IHouseListState } from '../types/list';
import { reset } from '../actions/list';
import { listHouses } from '../middlewares/list';
import { House } from '../models/House';

interface IProps {
  navigation: any;
  houses: IHouseListState;
  listHouses(): any;
  reset(): any;
}

class ListScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: i18n.t('settings.menu.main.houses'),
  };

  componentDidMount = () => {
    this.props.listHouses();
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { houses, navigation } = this.props;

    return (
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              {i18n.t('house.list.header')} ({houses.payload.totalItems})
            </Text>
          </Separator>
          <FlatList
            keyExtractor={house => house.id}
            data={houses.payload.items}
            refreshing={houses.loading}
            onRefresh={() => {
              this.props.listHouses();
            }}
            renderItem={({ item: house }: House) => {
              const { name, id } = house;

              return (
                <ListItem
                  key={id}
                  onPress={() => navigation.navigate('HouseShow', { id, name })}
                >
                  <Body>
                    <Text>{name}</Text>
                    <Text note>Rejoint le 10/10/2019</Text>
                  </Body>
                  <Right>
                    <Icon name={'ios-arrow-dropright-circle'} />
                  </Right>
                </ListItem>
              );
            }}
          />
        </Content>
        <Fab
          style={commonStyles.fabButton}
          position={'bottomRight'}
          onPress={() => {
            navigation.navigate('HouseAdd');
          }}
        >
          <Icon name={'add'} />
        </Fab>
      </>
    );
  };
}

export default connect(
  state => {
    return {
      houses: state.house.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listHouses, reset }, dispatch),
    };
  },
)(ListScreen);

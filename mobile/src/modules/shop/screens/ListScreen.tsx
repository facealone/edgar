import React from 'react';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Icon,
  Body,
  Right,
  Fab,
} from 'native-base';
import { commonStyles } from '../../../theme/common';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import { Shop } from '../models/Shop';
import { IShopListState, IShopListResetAction } from '../types/list';
import { listShops } from '../middlewares/list';
import { reset } from '../actions/list';

interface IProps {
  navigation: any;
  shops: IShopListState;
  listShops(): any;
  reset(): IShopListResetAction;
}

class ListScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listShops();
  };

  render = () => {
    const { navigation, shops } = this.props;

    return (
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              {i18n.t('shop.list.title')} ({shops.payload.totalItems})
            </Text>
          </Separator>
          <FlatList
            keyExtractor={shop => shop.id}
            data={shops.payload.items}
            refreshing={shops.loading}
            onRefresh={() => {
              this.props.listShops();
            }}
            renderItem={({ item: card }: Shop) => {
              const { name, id, numberOfItems } = card;

              return (
                <ListItem icon key={id}>
                  <Body>
                    <Text>{name}</Text>
                    <Text style={commonStyles.listHelper}>
                      {0 === numberOfItems
                        ? i18n.t('shop.list.emptyItem')
                        : i18n.t('shop.list.emptyItem', {
                            item: numberOfItems,
                          })}
                    </Text>
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
            navigation.navigate('ShopAdd');
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
      shops: state.shop.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listShops, reset }, dispatch),
    };
  },
)(ListScreen);

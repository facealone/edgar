import React from 'react';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Icon,
  Body,
  Right,
  Button,
} from 'native-base';
import { commonStyles } from '../../../theme/common';
import { MAIN_COLOR } from '../../../theme/colors';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import { IShop } from '../models/Shop';
import { IShopListState, IShopListResetAction } from '../types/list';
import { listShops } from '../middlewares/list';
import { reset } from '../actions/list';

interface IProps {
  navigation: any;
  shops: IShopListState;
  listShops(): any;
  reset(): IShopListResetAction;
}

class ListScreen extends React.Component<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listShops();
  };

  render = () => {
    const { navigation, shops } = this.props;

    return (
      <Content>
        <Separator bordered>
          <Text style={commonStyles.centerHeaderFlatList}>
            {i18n.t('shops.list.title')}
          </Text>
        </Separator>
        <FlatList
          keyExtractor={shop => shop.id}
          data={shops.payload}
          refreshing={shops.loading}
          onRefresh={() => {
            this.props.listShops();
          }}
          renderItem={({ item: card }: IShop) => {
            const { name, id } = card;

            return (
              <ListItem key={id} icon>
                <Body>
                  <Text>{name}</Text>
                  <Text style={style.helper}>8 articles</Text>
                </Body>
                <Right>
                  <Icon name={'ios-arrow-dropright-circle'} />
                </Right>
              </ListItem>
            );
          }}
        />
        <Button
          style={commonStyles.submitButton}
          onPress={() => {
            navigation.navigate('ShopAdd');
          }}
        >
          <Text>{i18n.t('shops.add.title')}</Text>
        </Button>
      </Content>
    );
  };
}

const style = StyleSheet.create({
  helper: {
    color: MAIN_COLOR,
    fontSize: 12,
  },
});

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

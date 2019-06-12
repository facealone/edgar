import React from 'react';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addShop } from '../middlewares/add';
import { IShopAddState, IShopAddResetAction, IShopForm } from '../types/add';
import ShopForm from '../component/ShopForm';

interface IProps {
  navigation: any;
  reset(): IShopAddResetAction;
  addShop(name: string): any;
  add: IShopAddState;
}

class AddScreen extends React.PureComponent<IProps> {
  static navigationOptions = {
    title: i18n.t('shop.add.title'),
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { add, navigation } = this.props;

    if (add.payload) {
      navigation.navigate('ShopList');
    }
  };

  handleSubmit = (payload: IShopForm) => {
    this.props.addShop(payload.name);
  };

  render = () => {
    const { add } = this.props;

    return (
      <Content padder>
        <ShopForm onSubmit={this.handleSubmit} loading={add.loading} />
      </Content>
    );
  };
}

export default connect(
  state => {
    return {
      add: state.shop.add,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, addShop }, dispatch),
    };
  },
)(AddScreen);

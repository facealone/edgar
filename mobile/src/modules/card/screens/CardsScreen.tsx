import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { Content, Text, ListItem, Left, Body, Right } from 'native-base';
import i18n from '../../../i18n';
import { listCards } from '../middlewares/list';
import { reset } from '../actions/list';
import { ICardListState, ICardListResetAction } from '../types/list';

interface IProps {
  reset(): ICardListResetAction;
  listCards(): any;
  cards: ICardListState;
}

class CardsScreen extends React.PureComponent<IProps> {
  static navigationOptions = {
    title: 'test',
  };

  renderItem = ({ item: card }) => (
    <ListItem itemDivider>
      <Left />
      <Body style={{ marginRight: 40 }}>
        <Text style={{ fontWeight: 'bold' }}>{card.name}</Text>
      </Body>
      <Right />
    </ListItem>
  );

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    this.props.listCards();
  }

  render() {
    const { cards } = this.props;

    return (
      <Content padder>
        <Text>{i18n.t('card.list.intro')}</Text>
        <FlatList
          keyExtractor={card => card.id}
          data={cards.payload}
          renderItem={this.renderItem}
        />
      </Content>
    );
  }
}

export default connect(
  state => {
    return {
      cards: state.card.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listCards, reset }, dispatch),
    };
  },
)(CardsScreen);

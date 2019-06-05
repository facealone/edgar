import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { Content, Text, Body, Right, Card, CardItem, Icon } from 'native-base';
import i18n from '../../../i18n';
import { listCards } from '../middlewares/list';
import { reset } from '../actions/list';
import { ICardListState, ICardListResetAction } from '../types/list';
import { ICard } from '../models/Card';

interface IProps {
  reset(): ICardListResetAction;
  listCards(): any;
  cards: ICardListState;
}

class ListScreen extends React.Component<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listCards();
  };

  renderItem = ({ item: card }: ICard) => {
    const { navigation } = this.props;
    const { barCode, name } = card;

    return (
      <Card>
        <CardItem
          button
          onPress={() => navigation.navigate('CardShow', { barCode, name })}
        >
          <Body>
            <Text>{name}</Text>
          </Body>
          <Right>
            <Icon name={'arrow-forward'} />
          </Right>
        </CardItem>
      </Card>
    );
  };

  render = () => {
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
  };
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
)(ListScreen);

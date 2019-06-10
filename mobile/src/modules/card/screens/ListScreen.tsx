import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import {
  Content,
  Text,
  Body,
  Right,
  Card,
  CardItem,
  Icon,
  Button,
} from 'native-base';
import i18n from '../../../i18n';
import { listCards } from '../middlewares/list';
import { reset } from '../actions/list';
import { ICardListState, ICardListResetAction } from '../types/list';
import { ICard } from '../models/Card';
import { MAIN_COLOR } from '../../../theme/colors';

interface IProps {
  reset(): ICardListResetAction;
  listCards(): any;
  navigation: any;
  cards: ICardListState;
}

class ListScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listCards();
  };

  render = () => {
    const { cards, navigation } = this.props;

    return (
      <Content padder>
        <Text>{i18n.t('card.list.intro')}</Text>
        <FlatList
          style={style.list}
          keyExtractor={card => card.id}
          data={cards.payload}
          refreshing={cards.loading}
          onRefresh={() => {
            this.props.listCards();
          }}
          renderItem={({ item: card }: ICard) => {
            const { barCode, name, id } = card;

            return (
              <Card key={id}>
                <CardItem
                  button
                  onPress={() =>
                    navigation.navigate('CardShow', { barCode, name, id })
                  }
                >
                  <Body>
                    <Text>{name}</Text>
                  </Body>
                  <Right>
                    <Icon name={'ios-arrow-dropright-circle'} />
                  </Right>
                </CardItem>
              </Card>
            );
          }}
        />
        <Button
          style={style.addButton}
          onPress={() => {
            navigation.navigate('CardScan');
          }}
        >
          <Text>{i18n.t('card.scan.button')}</Text>
        </Button>
      </Content>
    );
  };
}

const style = StyleSheet.create({
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'flex-end',
  },
});

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

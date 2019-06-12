import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import {
  Content,
  Text,
  Body,
  Right,
  Icon,
  Button,
  ListItem,
  Separator,
} from 'native-base';
import i18n from '../../../i18n';
import { listCards } from '../middlewares/list';
import { reset } from '../actions/list';
import { ICardListState, ICardListResetAction } from '../types/list';
import { ICard } from '../models/Card';
import { commonStyles } from '../../../theme/common';

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
      <Content>
        <Separator bordered>
          <Text style={commonStyles.centerHeaderFlatList}>
            {i18n.t('card.list.header')}
          </Text>
        </Separator>
        <FlatList
          keyExtractor={card => card.id}
          data={cards.payload}
          refreshing={cards.loading}
          onRefresh={() => {
            this.props.listCards();
          }}
          renderItem={({ item: card }: ICard) => {
            const { barCode, name, id } = card;

            return (
              <ListItem
                key={id}
                icon
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
              </ListItem>
            );
          }}
        />
        <Button
          style={commonStyles.submitButton}
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

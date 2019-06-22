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
  ListItem,
  Separator,
  Fab,
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
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              {i18n.t('card.list.header')} ({cards.payload.length})
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
              const { barCode, name, id, owner } = card;

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
                    <Text style={commonStyles.listHelper}>
                      {`${owner.firstName} ${owner.lastName}`}
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
            navigation.navigate('CardScan');
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
      cards: state.card.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listCards, reset }, dispatch),
    };
  },
)(ListScreen);

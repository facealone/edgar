import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Body,
  Right,
  Fab,
  Icon,
} from 'native-base';
import { commonStyles } from '../../../theme/common';
import { IBudgetListSate, IBudgetListResetAction } from '../types/list';
import { Budget } from '../models/Budget';
import { listBudgets } from '../middlewares/list';
import { reset } from '../actions/transaction/list';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';

interface IProps {
  budget: IBudgetListSate;
  navigation: any;
  reset(): IBudgetListResetAction;
  listBudgets(): any;
}

class ListScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listBudgets();
  };

  render = () => {
    const { budget, navigation } = this.props;

    return (
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              {i18n.t('budget.list.header')} ({budget.payload.length})
            </Text>
          </Separator>

          <FlatList
            keyExtractor={budget => budget.id}
            data={budget.payload}
            refreshing={budget.loading}
            onRefresh={() => {
              this.props.listBudgets();
            }}
            renderItem={({ item: budget }: Budget) => {
              const { id, name, balance, amount } = budget;
              const sign = balance > 0 ? '+' : '-';

              return (
                <ListItem
                  key={id}
                  onPress={() =>
                    navigation.navigate('BudgetTransactionList', { name, id })
                  }
                >
                  <Body>
                    <Text>{name}</Text>
                    <Text note>Budget mensuel {amount}€</Text>
                  </Body>
                  <Right>
                    <Text>{`${sign}${balance}€`}</Text>
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
            navigation.navigate('BudgetAdd');
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
      budget: state.budget.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, listBudgets }, dispatch),
    };
  },
)(ListScreen);

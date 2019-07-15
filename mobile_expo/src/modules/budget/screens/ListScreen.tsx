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
import { RED_COLOR } from '../../../theme/colors';

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
              {i18n.t('budget.list.header')} ({budget.payload.totalItems})
            </Text>
          </Separator>

          <FlatList
            keyExtractor={budget => budget.id}
            data={budget.payload.items}
            refreshing={budget.loading}
            onRefresh={() => {
              this.props.listBudgets();
            }}
            renderItem={({ item: budget }: Budget) => {
              const { id, name, shared, amount, balance } = budget;
              const balanceText = i18n.t('budget.list.balance', {
                balance,
              });

              return (
                <ListItem
                  key={id}
                  onPress={() =>
                    navigation.navigate('BudgetTransactionList', { name, id })
                  }
                >
                  <Body>
                    <Text>
                      {name}
                      {false === shared && (
                        <>
                          {' '}
                          <Icon name={'lock'} style={{ fontSize: 15 }} />
                        </>
                      )}
                    </Text>
                    {balance > 0 && <Text note>{balanceText}</Text>}
                    {balance <= 0 && (
                      <Text note style={{ color: RED_COLOR }}>
                        {balanceText}
                      </Text>
                    )}
                    <Text note>
                      {i18n.t('budget.list.amount', {
                        amount,
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

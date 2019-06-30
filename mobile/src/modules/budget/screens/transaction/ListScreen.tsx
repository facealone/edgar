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
  Spinner,
} from 'native-base';
import { commonStyles } from '../../../../theme/common';
import {
  IBudgetTransactionListSate,
  IBudgetTransactionListResetAction,
} from '../../types/transaction/list';
import { Transaction, TransactionType } from '../../models/Transaction';
import { listTransactions } from '../../middlewares/transaction/list';
import { reset } from '../../actions/transaction/list';
import { bindActionCreators } from 'redux';
import ResumeTransactions from '../../components/ResumeTransactions';

interface IProps {
  transactions: IBudgetTransactionListSate;
  navigation: any;
  reset(): IBudgetTransactionListResetAction;
  listTransactions(budgetId: string): any;
}

class ListScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    const { params } = this.props.navigation.state;

    this.props.listTransactions(params.id);
  };

  render = () => {
    const { transactions } = this.props;
    const { params } = this.props.navigation.state;
    const { payload } = transactions;

    return (
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              Budget Juin 2019
            </Text>
          </Separator>

          {transactions.loading && <Spinner />}
          {payload && (
            <>
              <ResumeTransactions transactions={transactions} />
              <FlatList
                keyExtractor={transaction => transaction.id}
                data={payload.transactions}
                refreshing={transactions.loading}
                onRefresh={() => {
                  this.props.listTransactions(params.id);
                }}
                renderItem={({ item: transaction }: Transaction) => {
                  const {
                    id,
                    name,
                    amount,
                    category,
                    owner,
                    createdAt,
                    type,
                  } = transaction;

                  let sign = '-';
                  let style = commonStyles.outlay;

                  if (TransactionType.CASH_INFLOW === type) {
                    sign = '+';
                    style = commonStyles.inflow;
                  }

                  return (
                    <ListItem key={id}>
                      <Body>
                        <Text>{name}</Text>
                        <Text note>{category.name}</Text>
                        <Text note>
                          {owner.firstName} {owner.lastName}
                        </Text>
                        <Text note>{createdAt}</Text>
                      </Body>
                      <Right>
                        <Text style={style}>{`${sign}${amount}€`}</Text>
                      </Right>
                    </ListItem>
                  );
                }}
              />
            </>
          )}
        </Content>
        <Fab
          style={commonStyles.fabButton}
          position={'bottomRight'}
          onPress={() => {}}
        >
          <Icon name={'add'} />
        </Fab>
      </>
    );
  };
}

ListScreen.navigationOptions = ({ navigation }: any) => {
  const { name } = navigation.state.params;

  return {
    title: name,
  };
};

export default connect(
  state => {
    return {
      transactions: state.budget.transaction.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ reset, listTransactions }, dispatch),
    };
  },
)(ListScreen);

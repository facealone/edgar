import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Body,
  Right,
  Fab,
  Icon,
  Card,
  CardItem,
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

          {payload && (
            <>
              <ScrollView
                style={{ margin: 5 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <Card>
                  <CardItem header bordered>
                    <Text>Entrée</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text style={styles.inflow}>{payload.cashInflow}€</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem header bordered>
                    <Text>Dépense</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text style={styles.outlay}>{payload.cashOutlay}€</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem header bordered>
                    <Text>Balance</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text
                        style={
                          payload.balance > 0 ? styles.inflow : styles.outlay
                        }
                      >
                        {payload.balance}€
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              </ScrollView>
              <FlatList
                keyExtractor={transaction => transaction.id}
                data={payload.transactions}
                refreshing={transactions.loading}
                onRefresh={() => {
                  this.props.listTransactions(params.id);
                }}
                renderItem={({ item: transaction }: Transaction) => {
                  const { id, name, amount, note, owner, type } = transaction;

                  let sign = '-';
                  let style = styles.outlay;

                  if (TransactionType.CASH_INFLOW === type) {
                    sign = '+';
                    style = styles.inflow;
                  }

                  return (
                    <ListItem key={id}>
                      <Body>
                        <Text>{name}</Text>
                        <Text note>
                          {owner.firstName} {owner.lastName}
                        </Text>
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

const styles = StyleSheet.create({
  inflow: {
    color: '#32CD32',
    fontWeight: 'bold',
  },
  outlay: {
    color: '#DC143C',
    fontWeight: 'bold',
  },
});

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

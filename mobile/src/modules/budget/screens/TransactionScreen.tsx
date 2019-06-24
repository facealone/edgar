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
  Button,
} from 'native-base';
import { commonStyles } from '../../../theme/common';
import {
  IBudgetTransactionListSate,
  IBudgetTransactionListResetAction,
} from '../types/transaction/list';
import i18n from '../../../i18n';
import { Transaction, TransactionType } from '../models/Transaction';
import { listTransactions } from '../middlewares/transaction/list';
import { reset } from '../actions/transaction/list';
import { bindActionCreators } from 'redux';

interface IProps {
  transactions: IBudgetTransactionListSate;
  navigation: any;
  reset(): IBudgetTransactionListResetAction;
  listTransactions(): any;
}

class TransactionScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listTransactions();
  };

  render = () => {
    const { transactions } = this.props;
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
              <Button iconLeft style={commonStyles.filterButton} small bordered>
                <Icon style={commonStyles.darkText} name={'ios-reorder'} />
                <Text style={commonStyles.darkText}>Filtres</Text>
              </Button>
              <FlatList
                keyExtractor={transaction => transaction.id}
                data={payload.transactions}
                refreshing={transactions.loading}
                onRefresh={() => {
                  this.props.listTransactions();
                }}
                renderItem={({ item: transaction }: Transaction) => {
                  const { id, name, amount, owner, type } = transaction;

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
)(TransactionScreen);

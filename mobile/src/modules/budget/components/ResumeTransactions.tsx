import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Body, Card, CardItem, View } from 'native-base';
import RNSpeedometer from 'react-native-speedometer';
import i18n from '../../../i18n';
import { IBudgetTransactionListSate } from '../types/transaction/list';

interface IProps {
  transactions: IBudgetTransactionListSate;
}

export default class ResumeTransactions extends React.PureComponent<IProps> {
  render = () => {
    const { transactions } = this.props;
    const { payload } = transactions;

    return (
      <>
        <View style={styles.graphContent}>
          <RNSpeedometer
            value={payload.balance}
            maxValue={payload.budget}
            labelStyle={{ display: 'none' }}
            labelNoteStyle={{ display: 'none' }}
            size={230}
            wrapperStyle={styles.graph}
          />
        </View>
        <ScrollView
          style={{ margin: 5 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Card transparent>
            <CardItem header bordered>
              <Text>{i18n.t('budget.transaction.list.budget')}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.bold}>{payload.budget}€</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header bordered>
              <Text>{i18n.t('budget.transaction.list.inflow')}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.bold}>{payload.cashInflow}€</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header bordered>
              <Text>{i18n.t('budget.transaction.list.outlay')}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.bold}>{payload.cashOutlay}€</Text>
              </Body>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header bordered>
              <Text>{i18n.t('budget.transaction.list.balance')}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.bold}>{payload.balance}€</Text>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  graphContent: {
    marginTop: 20,
  },
  graph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: { fontWeight: 'bold' },
});

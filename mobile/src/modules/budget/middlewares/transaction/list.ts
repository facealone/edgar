import { loading, success, errors } from '../../actions/transaction/list';
import { TransactionList } from '../../models/TransactionList';
import { Transaction } from '../../models/Transaction';
import { Owner } from '../../../user/models/Owner';

export const listTransactions = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/transactions');
      const payload = response.data;

      const transactions = [];

      for (const transaction of payload.transactions) {
        const { owner, category } = transaction;

        transactions.push(
          new Transaction(
            transaction.id,
            transaction.name,
            transaction.type,
            transaction.amount,
            transaction.note,
            transaction.createdAt,
            new Owner(owner.firstName, owner.lastName),
          ),
        );
      }

      dispatch(
        success(
          new TransactionList(
            payload.cashInflow,
            payload.cashOutlay,
            payload.balance,
            transactions,
          ),
        ),
      );
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

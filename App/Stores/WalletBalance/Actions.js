import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * WalletBalance actions are defined here
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */

const { Types, Creators } = createActions({
  // Fetch wallet Balance
  getWalletBalance: ['failureFn'],
  // walletBalance were successfully fetched
  walletBalanceSuccess: ['walletBalance', 'transactionList'],
  // An error occurred
  walletBalanceFailure: ['errorMessage'],
  // get Transaction Detail
  getTransactionDetail: ['operationType', 'id'],
  // transaction detail success
  transactionDetailSuccess: ['transactionDetail'],
  // transaction detail failure
  transactionDetailFailure: ['errorMessage'],
  // Fetch Bitcoin wallet Balance
  getBitcoinBalance: ['coin', 'successFn', 'failureFn'],
  // update wallet
  updateWallet: ['data', 'successFn', 'failureFn'],
  // get monthly transaction list
  getMonthlyTransactionDetail: ['operationType', 'id', 'successFn'],
})

export const WalletActions = Types
export default Creators

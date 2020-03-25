/**
 * Redux state changes based on login actions.
 *
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WalletActions } from './Actions'

// WalletBalance process start state change
export const getWalletBalance = (state) => ({
  ...state,
  dashboardIsLoading: true,
  walletBalanceFailure: null,
})

// WalletBalance sucess state change
export const walletBalanceSuccess = (state, { walletBalance, transactionList }) => ({
  ...state,
  getWalletBalance: walletBalance,
  transactionList: transactionList,
  dashboardIsLoading: false,
  walletBalanceFailure: null,
})

// WalletBalance Failure state change
export const walletBalanceFailure = (state, { errorMessage }) => ({
  ...state,
  getWalletBalance: null,
  transactionList: [],
  dashboardIsLoading: false,
  walletBalanceFailure: errorMessage,
})

// Transaction detail process start state change
export const getTransactionDetail = (state) => ({
  ...state,
  dashboardIsLoading: true,
  transactionDetailFailure: null,
})

// Transaction detail sucess state change
export const transactionDetailSuccess = (state, { transactionDetail }) => ({
  ...state,
  transactionDetail: transactionDetail,
  dashboardIsLoading: false,
  transactionDetailFailure: null,
})

// Transaction detail Failure state change
export const transactionDetailFailure = (state, { errorMessage }) => ({
  ...state,
  transactionDetail: {},
  dashboardIsLoading: false,
  transactionDetailFailure: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const WalletReducer = createReducer(INITIAL_STATE, {
  [WalletActions.GET_WALLET_BALANCE]: getWalletBalance,
  [WalletActions.WALLET_BALANCE_SUCCESS]: walletBalanceSuccess,
  [WalletActions.WALLET_BALANCE_FAILURE]: walletBalanceFailure,
  [WalletActions.GET_TRANSACTION_DETAIL]: getTransactionDetail,
  [WalletActions.TRANSACTION_DETAIL_SUCCESS]: transactionDetailSuccess,
  [WalletActions.TRANSACTION_DETAIL_FAILURE]: transactionDetailFailure,
})

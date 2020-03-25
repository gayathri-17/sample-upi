/**
 * Redux state changes based on user actions.
 *
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { UserActions } from './Actions'

// On success Login - save token
export const setToken = (state, { token }) => ({
  ...state,
  token,
})

// Set onBoarding profile details
export const setOnBoardingProfile = (state, { data }) => ({
  ...state,
  onBoardingProfile: data,
  language: data.language ? data.language : 'eng',
  defaultCurrency: data.default_currency ? data.default_currency : 'USD',
})

// Set profile Photo
export const setProfilePhoto = (state, { data }) => ({
  ...state,
  profilePhoto: data,
})

// Set CurrencyData details
export const setCurrencyValue = (state, { data }) => ({
  ...state,
  currentCurrency: data,
})

// Set balance and transaction detail
export const setBalanceAndTransactionLimit = (state, { balance, transactionLimit }) => ({
  ...state,
  balanceBasedOnCoinSelected: balance,
  transactionLimit: transactionLimit,
})

// Set commission for all currencies
export const setCommissions = (state, { commissions }) => ({
  ...state,
  commissions: commissions,
})

// Set transfer object
export const setTransfer = (state, { transfer }) => ({
  ...state,
  transfer: transfer,
})

// Set selected bank data
export const setSelectedBank = (state, { bankData }) => ({
  ...state,
  selectedBank: bankData,
})

// Transfer transaction success
export const transferTransactionSuccess = (state, { data }) => ({
  ...state,
  transferTransactionSuccess: data,
})

// set security methods
export const setSecurityMethods = (state, { data }) => ({
  ...state,
  securityMethods: data,
})

// set euro methods
export const setEuroCurrencyValue = (state, { euro }) => ({
  ...state,
  euroCurrencyValue: euro,
})

// set bankAccounts
export const bankAccountsSuccess = (state, { bankList }) => ({
  ...state,
  bankAccounts: bankList,
})

// set transaction list
export const setTransactionList = (state, { data }) => ({
  ...state,
  transactionList: data,
})

// get Total Balance
export const setTotalBalance = (state, { totalBalance }) => ({
  ...state,
  getTotalBalance: totalBalance,
})

// set currency expiration
export const setCurrencyExpiration = (state, { data }) => ({
  ...state,
  currencyExpirationDetails: { expireTime: data.exp, validFrom: data.expTime },
})

// set currency expiration
export const setAppRating = (state, { setAppRating }) => ({
  ...state,
  appRating: setAppRating,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const UserReducer = createReducer(INITIAL_STATE, {
  [UserActions.SET_TOKEN]: setToken,
  [UserActions.SET_ON_BOARDING_PROFILE]: setOnBoardingProfile,
  [UserActions.SET_PROFILE_PHOTO]: setProfilePhoto,
  [UserActions.SET_BALANCE_AND_TRANSACTION_LIMIT]: setBalanceAndTransactionLimit,
  [UserActions.SET_COMMISSIONS]: setCommissions,
  [UserActions.SET_TRANSFER]: setTransfer,
  [UserActions.SET_SELECTED_BANK]: setSelectedBank,
  [UserActions.TRANSFER_TRANSACTION_SUCCESS]: transferTransactionSuccess,
  [UserActions.SET_SECURITY_METHODS]: setSecurityMethods,
  [UserActions.SET_CURRENCY_VALUE]: setCurrencyValue,
  [UserActions.SET_EURO_CURRENCY_VALUE]: setEuroCurrencyValue,
  [UserActions.SET_CURRENCY_EXPIRATION]: setCurrencyExpiration,
  [UserActions.BANK_ACCOUNTS_SUCCESS]: bankAccountsSuccess,
  [UserActions.SET_TRANSACTION_LIST]: setTransactionList,
  [UserActions.SET_TOTAL_BALANCE]: setTotalBalance,
  [UserActions.SET_APP_RATING]: setAppRating,
})

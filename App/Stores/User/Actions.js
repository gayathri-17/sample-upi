import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * User actions are defined here
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */

const { Types, Creators } = createActions({
  // Login - Api
  login: ['loginData', 'failureFn'],

  // Save login token
  setToken: ['token'],

  // Profile - Api
  getProfile: ['successFn', 'failureFn'],

  // Get Profile Photo - Api
  getProfilePhoto: ['successFn'],

  // Upload Profile Photo - Api
  uploadProfilePhoto: ['data', 'successFn'],

  // Set profile Photo
  setProfilePhoto: ['data'],

  // change user default language - Api
  changeLanguage: ['data', 'successFn'],

  // change user default fiat currency - Api
  changeFiatCurrency: ['data', 'successFn'],

  // CurrencyValue - Api
  getCurrencyValue: [],

  // setCurrencyValue - Api
  setCurrencyValue: ['data'],

  // setCurrencyExpiration - Api
  setCurrencyExpiration: ['data'],

  // Set onBoarding profile
  setOnBoardingProfile: ['data'],

  // Update user information - Api
  updateUserInformation: ['userData', 'successFn'],

  // OTP validation - Api
  validateOtp: ['phoneData'],

  // submit user OTP with callback
  validateOtpWithCallback: ['otpData', 'successFn'],

  // get balance and transaction limit
  getBalanceAndTransactionLimit: ['coin', 'failureFn'],

  // Set balance and transaction limit
  setBalanceAndTransactionLimit: ['balance', 'transactionLimit'],

  // get commission for currency
  getCommissions: [],

  // get commission for currency
  setCommissions: ['commissions'],

  // set transfer object
  setTransfer: ['transfer'],

  // Bank account list - Api
  getBankAccounts: ['successFn', 'failureFn'],

  // set selected bank data for transaction
  setSelectedBank: ['bankData'],

  // transfer transaction progress
  transferTransactionProgress: ['data', 'successFn', 'failureFn'],

  // transfer transaction success
  transferTransactionSuccess: ['data'],

  // transfer crypto currency
  transferCryptoProgress: ['currency', 'data', 'successFn', 'failureFn'],

  // add Contact
  addContact: ['coin', 'successFn'],

  // get Contact List
  getContactList: ['coin', 'isLoader', 'successFn', 'failureFn'],

  // transfer to contact transaction progress
  contactTransferTransactionProgress: ['data', 'successFn', 'failureFn'],

  // get Security methods
  getSecurityMethods: ['successFn'],

  // set Security methods
  setSecurityMethods: ['data'],

  // set Security methods
  addBankAccount: ['successFn', 'data', 'apiType'],

  // change password function
  changePassword: ['data', 'successFn'],

  // tfa change request
  tfaChangeRequest: ['data', 'successFn', 'failureFn'],

  // tfa change confirm
  tfaChangeConfirm: ['data', 'successFn'],

  // post security methods
  postSecurityMethods: ['data', 'successFn', 'failureFn'],

  // check transactions
  checkTx: ['successFn', 'failureFn'],

  // sms verificatio
  submitSmsVerification: ['method', 'uuid', 'code', 'successFn', 'failureFn'],

  // cancel transaction
  cancelTransaction: [],

  // resend sms
  resend: ['data', 'successFn'],

  // process transaction
  processTransaction: ['successFn', 'failureFn'],

  // delete security methods
  deleteSecurityMethods: ['data', 'successFn', 'failureFn'],

  // process deposit
  processFiatDeposit: ['depositData', 'successFn'],

  // process deposit
  getMasterBank: ['successFn'],

  // set euro currency deposit
  setEuroCurrencyValue: ['euro'],

  // bank Accounts
  bankAccountsSuccess: ['bankList'],

  // get tfa verification token
  getTfaVerificationToken: ['successFn'],

  // post tfa verification token
  postTfaVerification: ['tfaData', 'successFn'],

  // get transaction list
  getTransactionList: ['data', 'isLoader', 'successFn'],

  // set transaction list
  setTransactionList: ['data'],

  // get monthly transactionList
  getMonthlyTransactionList: ['year', 'month', 'successFn'],

  // buy sell crypto action
  getBuySellHash: ['data', 'selectedType', 'currency', 'successFn'],

  // confirm buy sell
  confirmBuySell: ['selectedType', 'hash', 'successFn', 'failureFn'],

  // confirm bank transfer
  confirmBankTransfer: ['data', 'failureFn'],

  // confirm crypto transfer
  confirmCryptoTransfer: ['data', 'failureFn'],

  // confirm contact transfer
  confirmContactTransfer: ['data', 'failureFn'],

  // onfido check
  onfidoCheck: ['successFn'],

  // send referral link
  sendReferralLink: null,

  // confirmFiatDeposit
  confirmFiatDeposit: ['confirmData', 'successFn'],

  // total balanse
  getTotalBalance: [],

  // total balanse
  setTotalBalance: ['totalBalance'],

  // ibanValidation
  validateIBAN: ['ibanData', 'successFn'],

  // set App Rating
  setAppRating: ['setAppRating'],
})

export const UserActions = Types
export default Creators

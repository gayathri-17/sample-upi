import { takeLatest, all } from 'redux-saga/effects'
import { UserActions } from 'App/Stores/User/Actions'
import { SignUpActions } from 'App/Stores/SignUp/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { WalletActions } from 'App/Stores/WalletBalance/Actions'
import {
  getWalletBalance,
  userLogin,
  getProfile,
  getProfilePhoto,
  uploadProfilePhoto,
  changeLanguage,
  changeFiatCurrency,
  getBalanceAndLimit,
  getCommisions,
  getCurrencyValues,
  getBitcoinBalance,
  getTotalBalance,
} from './UserSaga'
import { getBuySellHash, confirmBuySell } from './BuySellSaga'
import { confirmFiatDeposit, processDeposit } from './DepositSaga'
import {
  changePassword,
  submitSmsVerification,
  checktx,
  deleteSecurityMethods,
  postSecurityMethods,
  tfaChangeConfirm,
  tfaChangeRequest,
  cancelTransaction,
  resend,
  processTransaction,
  getTfaVerificationToken,
  postTfaVerification,
  getSecurityMethods,
} from './AuthenticationSaga'
import { startup } from './StartupSaga'
import {
  getMasterBank,
  addBankAccount,
  getBanckAccountsList,
  validateIBAN,
} from './BankAccountSaga'
import {
  confirmCryptoTransfer,
  transferCryptoProgress,
  confirmContactTransfer,
  contactTransferTransactionProgress,
  confirmBankTransfer,
  transferTransactionProgress,
} from './SendSaga'
import {
  getMonthlyTransactionDetail,
  getMonthlyTransactionList,
  getStatementsList,
  getTransactionDetail,
  updateWallet,
} from './TransactionsSaga'
import { getContactList, addContact } from './ContactsSaga'
import {
  signUp,
  userVerification,
  getCountryList,
  getProvinceList,
  getBusinessDocuments,
  uploadBusinessDocByType,
  getUserDocuments,
  reqForgotPassEmail,
  resetPassword,
  getBusinessCategory,
  updateBusinessInfo,
  getOnfidoToken,
  otpValidationWithCallback,
  onfidoCheck,
  updateUserInformation,
  validateOtp,
} from './SignUpSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),

    // Call `Login()` when login is triggered
    takeLatest(UserActions.LOGIN, userLogin),

    // Call `SignUp()` when sign up is triggered
    takeLatest(SignUpActions.SIGN_UP, signUp),

    // Call `userVerification()` when sign up is triggered
    takeLatest(SignUpActions.USER_VERIFICATION, userVerification),

    // Call `getBusinessDocuments()` when user entered to the Business document screen
    takeLatest(SignUpActions.GET_BUSINESS_DOCUMENTS, getBusinessDocuments),

    // Call `uploadBusinessDocByType()` when Upload is triggered
    takeLatest(SignUpActions.SUBMIT_BUSINESS_DOCUMENT, uploadBusinessDocByType),

    // Call `walletBalance()` when dashboard page is rendered
    takeLatest(WalletActions.GET_WALLET_BALANCE, getWalletBalance),

    // Call  `getCountryList()` on entering address information Screen
    takeLatest(SignUpActions.GET_COUNTRY_LIST, getCountryList),

    // Call `getProfile()` when entering to dashboard
    takeLatest(UserActions.GET_PROFILE, getProfile),

    // Call `getProfilePhoto()` when entering to Settings
    takeLatest(UserActions.GET_PROFILE_PHOTO, getProfilePhoto),

    // Call `uploadProfilePhoto()` on profile photo upload
    takeLatest(UserActions.UPLOAD_PROFILE_PHOTO, uploadProfilePhoto),

    // Call `changeFiatCurrency()` on change default currency
    takeLatest(UserActions.CHANGE_FIAT_CURRENCY, changeFiatCurrency),

    // Call `changeLanguage()` on change default language
    takeLatest(UserActions.CHANGE_LANGUAGE, changeLanguage),

    // Call `updateUserInformation()` when update is triggered
    takeLatest(UserActions.UPDATE_USER_INFORMATION, updateUserInformation),

    // Call `validateOtp()` when update is triggered
    takeLatest(UserActions.VALIDATE_OTP, validateOtp),

    // Call  `getProvinceList()` on entering address information Screen
    takeLatest(SignUpActions.GET_PROVINCE_LIST, getProvinceList),

    // Call `getTransactionList()` when dashboard page is rendered
    takeLatest(WalletActions.GET_TRANSACTION_DETAIL, getTransactionDetail),

    // Call `otpValidationWithCallback()` when verify is triggered
    takeLatest(UserActions.VALIDATE_OTP_WITH_CALLBACK, otpValidationWithCallback),

    // Call ` getBalanceAndLimit()` when amount page is rendered
    takeLatest(UserActions.GET_BALANCE_AND_TRANSACTION_LIMIT, getBalanceAndLimit),

    // Call ` getCommisions()` when send detail page is rendered
    takeLatest(UserActions.GET_COMMISSIONS, getCommisions),

    // Call `getBanckAccountsList()` to list user's bank accounts
    takeLatest(UserActions.GET_BANK_ACCOUNTS, getBanckAccountsList),

    // Call 'transferTransactionProgress()' to process payment
    takeLatest(UserActions.TRANSFER_TRANSACTION_PROGRESS, transferTransactionProgress),

    // Call 'addContact()' to add contact
    takeLatest(UserActions.ADD_CONTACT, addContact),

    // Call 'getCurrencyValues()' to add contact
    takeLatest(UserActions.GET_CURRENCY_VALUE, getCurrencyValues),

    // Call 'getBitcoinBalance()' to add contact
    takeLatest(WalletActions.GET_BITCOIN_BALANCE, getBitcoinBalance),

    // Call 'getContactList()' to add contact
    takeLatest(UserActions.GET_CONTACT_LIST, getContactList),

    // Call 'contactTransferTransactionProgress()' to process payment
    takeLatest(
      UserActions.CONTACT_TRANSFER_TRANSACTION_PROGRESS,
      contactTransferTransactionProgress
    ),

    // Call getSecurity Methods' to get security methods
    takeLatest(UserActions.GET_SECURITY_METHODS, getSecurityMethods),

    // Call 'transferCryptoProgress' to tranfer crypto currency
    takeLatest(UserActions.TRANSFER_CRYPTO_PROGRESS, transferCryptoProgress),

    // Call 'addBankAccount' to add bank account
    takeLatest(UserActions.ADD_BANK_ACCOUNT, addBankAccount),

    // Call 'Change Password()' to change password
    takeLatest(UserActions.CHANGE_PASSWORD, changePassword),

    // Call 'tfaChangeRequest()' to process tfa change
    takeLatest(UserActions.TFA_CHANGE_REQUEST, tfaChangeRequest),

    // Call 'tfaChangeConfirm()' to process tfa confirmation
    takeLatest(UserActions.TFA_CHANGE_CONFIRM, tfaChangeConfirm),

    // Call 'postSecurityMethods()' to process post security methods
    takeLatest(UserActions.POST_SECURITY_METHODS, postSecurityMethods),

    // Call 'checktx()' to check transactions
    takeLatest(UserActions.CHECK_TX, checktx),

    // Call 'submitSmsVerification()' to check transactions
    takeLatest(UserActions.SUBMIT_SMS_VERIFICATION, submitSmsVerification),

    // Call 'cancelTrasaction()' to cancel transaction
    takeLatest(UserActions.CANCEL_TRANSACTION, cancelTransaction),

    // Call 'resendSms()' to cancel transaction
    takeLatest(UserActions.RESEND, resend),

    // Call ''processTransaction' to process email transaction
    takeLatest(UserActions.PROCESS_TRANSACTION, processTransaction),

    // Call ''deleteSecurityMethods' to process email transaction
    takeLatest(UserActions.DELETE_SECURITY_METHODS, deleteSecurityMethods),

    // Call 'getUserDocuments' to process email transaction
    takeLatest(SignUpActions.GET_USER_DOCUMENTS, getUserDocuments),

    // Call 'updatewallet()' to update wallet alias
    takeLatest(WalletActions.UPDATE_WALLET, updateWallet),

    // Call ''processDeposit' to process email transaction
    takeLatest(UserActions.PROCESS_FIAT_DEPOSIT, processDeposit),

    // Call ''getMasterBank' to process email transaction
    takeLatest(UserActions.GET_MASTER_BANK, getMasterBank),

    // Call `reqForgotPassEmail()` when request email is triggered
    takeLatest(SignUpActions.REQ_FORGOT_PASS_EMAIL, reqForgotPassEmail),

    // Call `resetPassword()` when request email is triggered
    takeLatest(SignUpActions.RESET_PASSWORD, resetPassword),

    // Call `getTfaVerificationToken()` when request token is triggered
    takeLatest(UserActions.GET_TFA_VERIFICATION_TOKEN, getTfaVerificationToken),

    // Call `postTfaVerification()` when request token is triggered
    takeLatest(UserActions.POST_TFA_VERIFICATION, postTfaVerification),

    // Call `getStatementsList()` when get transaction statements is triggered
    takeLatest(UserActions.GET_TRANSACTION_LIST, getStatementsList),

    // Call `getBusinessCategory()` when request email is triggered
    takeLatest(SignUpActions.GET_BUSINESS_CATEGORY, getBusinessCategory),

    // Call `updateBusinessInfo()` when request email is triggered
    takeLatest(SignUpActions.UPDATE_BUSINESS_INFO, updateBusinessInfo),

    // Call `getMonthlyTransactionList()` when montly transaction filtered
    takeLatest(UserActions.GET_MONTHLY_TRANSACTION_LIST, getMonthlyTransactionList),

    // Call `getMonthlyTransactionDetail()` when montly transaction filtered
    takeLatest(WalletActions.GET_MONTHLY_TRANSACTION_DETAIL, getMonthlyTransactionDetail),

    // Call `getBuySellHash()` when make  purchase or sell
    takeLatest(UserActions.GET_BUY_SELL_HASH, getBuySellHash),

    // Call `confirmBuySell()` when confirm purchase or sell
    takeLatest(UserActions.CONFIRM_BUY_SELL, confirmBuySell),

    // Call `confirmBankTransfer()` when confirm purchase or sell
    takeLatest(UserActions.CONFIRM_BANK_TRANSFER, confirmBankTransfer),

    // Call `confirmCryptoTransfer()` when confirm purchase or sell
    takeLatest(UserActions.CONFIRM_CRYPTO_TRANSFER, confirmCryptoTransfer),

    // Call `confirmContactTransfer()` when confirm purchase or sell
    takeLatest(UserActions.CONFIRM_CONTACT_TRANSFER, confirmContactTransfer),

    // Call onfidoCheck()` when onfido profile complted
    takeLatest(UserActions.ONFIDO_CHECK, onfidoCheck),

    // Call confirmFiatDeposit()` when onfido profile complted
    takeLatest(UserActions.CONFIRM_FIAT_DEPOSIT, confirmFiatDeposit),

    // Call getTotalBalance()` when onfido profile complted
    takeLatest(UserActions.GET_TOTAL_BALANCE, getTotalBalance),

    // Call  `getOnfidoToken()` on entering address information Screen
    takeLatest(SignUpActions.GET_ONFIDO_TOKEN, getOnfidoToken),

    // Call  `validateIBAN()` on entering address information Screen
    takeLatest(UserActions.VALIDATE_IBAN, validateIBAN),
  ])
}

import { createStackNavigator } from 'react-navigation'
import ContactListScreen from 'App/Containers/Contacts/ContactListScreen/ContactListScreen'
import AddNewContactScreen from 'App/Containers/Send/AddNewContactScreen/AddNewContactScreen'
import ContactDetailScreen from 'App/Containers/Contacts/ContactDetailScreen/ContactDetailScreen'
import SendAuthenticationScreen from 'App/Containers/Send/SendAuthenticationScreen/SendAuthenticationScreen'
import SendEnterAmountScreen from 'App/Containers/Send/SendEnterAmountScreen/SendEnterAmountScreen'
import SendAmountDetailScreen from 'App/Containers/Send/SendAmountDetailScreen/SendAmountDetailScreen'
import SendUploadDocumentScreen from 'App/Containers/Send/SendUploadDocumentScreen/SendUploadDocumentScreen'
import CryptoCurrencyWalletListScreen from 'App/Containers/Send/CryptoCurrencyWalletListScreen/CryptoCurrencyWalletListScreen'
import CryptoAmountViewScreen from 'App/Containers/Send/CryptoAmountViewScreen/CryptoAmountViewScreen'
import CryptoAmountEnterScreen from 'App/Containers/Send/CryptoAmountEnterScreen/CryptoAmountEnterScreen'
import AddUSABankAccountScreen from 'App/Containers/Settings/AddUSABankAccountScreen/AddUSABankAccountScreen'
import AccountLimitScreen from 'App/Containers/Settings/AccountLimits/AccountLimitsScreen'
import BitcoinWalletScreen from 'App/Containers/Deposit/BitcoinWallet/BitcoinWalletScreen'
import DepositQrCodeViewerScreen from 'App/Containers/Deposit/DepositQrCode/DepositQrCodeViewerScreen'
import RequestToContactScreen from 'App/Containers/Deposit/RequestToContactScreen/RequestToContactScreen'

/**
 * The root screen contains the Contact screen flow's navigation.
 */
export const ContactStackNavigator = createStackNavigator({
  ContactListScreen: {
    screen: ContactListScreen,
    navigationOptions: { header: null },
  },
  AddNewContactScreen: {
    screen: AddNewContactScreen,
    navigationOptions: { header: null },
  },
  ContactDetailScreen: {
    screen: ContactDetailScreen,
    navigationOptions: { header: null },
  },
  SendAuthenticationScreen: {
    screen: SendAuthenticationScreen,
    navigationOptions: { header: null },
  },
  SendEnterAmountScreen: {
    screen: SendEnterAmountScreen,
    navigationOptions: { header: null },
  },
  SendAmountDetailScreen: {
    screen: SendAmountDetailScreen,
    navigationOptions: { header: null },
  },
  SendUploadDocumentScreen: {
    screen: SendUploadDocumentScreen,
    navigationOptions: { header: null },
  },
  CryptoWalletListScreen: {
    screen: CryptoCurrencyWalletListScreen,
    navigationOptions: { header: null },
  },
  CryptoAmountViewScreen: {
    screen: CryptoAmountViewScreen,
    navigationOptions: { header: null },
  },
  CryptoAmountEnterScreen: {
    screen: CryptoAmountEnterScreen,
    navigationOptions: { header: null },
  },
  AddUSABankAccountScreen: {
    screen: AddUSABankAccountScreen,
    navigationOptions: { header: null },
  },
  AccountLimitScreen: {
    screen: AccountLimitScreen,
    navigationOptions: { header: null },
  },
  BitcoinWalletScreen: {
    screen: BitcoinWalletScreen,
    navigationOptions: { header: null },
  },
  DepositQrCodeViewerScreen: {
    screen: DepositQrCodeViewerScreen,
    navigationOptions: { header: null },
  },
  RequestToContactScreen: {
    screen: RequestToContactScreen,
    navigationOptions: { header: null },
  },
})

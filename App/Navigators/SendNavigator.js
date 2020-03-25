import { createStackNavigator } from 'react-navigation'
import SendAuthenticationScreen from 'App/Containers/Send/SendAuthenticationScreen/SendAuthenticationScreen'
import SendMainScreen from 'App/Containers/Send/SendMainScreen/SendMainScreen'
import SendToOptionsScreen from 'App/Containers/Send/SendToOptionsScreen/SendToOptionsScreen'
import SendEnterAmountScreen from 'App/Containers/Send/SendEnterAmountScreen/SendEnterAmountScreen'
import AddNewContactScreen from 'App/Containers/Send/AddNewContactScreen/AddNewContactScreen'
import SendAmountDetailScreen from 'App/Containers/Send/SendAmountDetailScreen/SendAmountDetailScreen'
import DefaultStrings from 'App/Constants/DefaultStrings'
import ContactList from 'App/Containers/Send/ContactList/ContactList'
import SendUploadDocumentScreen from 'App/Containers/Send/SendUploadDocumentScreen/SendUploadDocumentScreen'
import CryptoCurrencyWalletListScreen from 'App/Containers/Send/CryptoCurrencyWalletListScreen/CryptoCurrencyWalletListScreen'
import CryptoAmountViewScreen from 'App/Containers/Send/CryptoAmountViewScreen/CryptoAmountViewScreen'
import CryptoAmountEnterScreen from 'App/Containers/Send/CryptoAmountEnterScreen/CryptoAmountEnterScreen'
import AddUSABankAccountScreen from 'App/Containers/Settings/AddUSABankAccountScreen/AddUSABankAccountScreen'
import AddEuroBankAccountScreen from 'App/Containers/Settings/AddEuroBankAccountScreen/AddEuroBankAccountScreen'
import AccountLimitScreen from 'App/Containers/Settings/AccountLimits/AccountLimitsScreen'

/**
 * The root screen contains the send screen flow's navigation.
 */
export const sendStackNavigator = createStackNavigator({
  SendMainScreen: {
    screen: SendMainScreen,
    navigationOptions: { header: null },
    params: { type: DefaultStrings.TYPE_SEND },
  },
  ContactList: {
    screen: ContactList,
    navigationOptions: { header: null },
  },
  SendAuthenticationScreen: {
    screen: SendAuthenticationScreen,
    navigationOptions: { header: null },
  },
  AddNewContactScreen: {
    screen: AddNewContactScreen,
    navigationOptions: { header: null },
  },
  SendToOptionsScreen: {
    screen: SendToOptionsScreen,
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
  AddEuroBankAccountScreen: {
    screen: AddEuroBankAccountScreen,
    navigationOptions: { header: null },
  },
  AccountLimitScreen: {
    screen: AccountLimitScreen,
    navigationOptions: { header: null },
  },
})

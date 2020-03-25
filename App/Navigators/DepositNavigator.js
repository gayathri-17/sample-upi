import { createStackNavigator } from 'react-navigation'
import DepositMainScreen from 'App/Containers/Deposit/DepositMainScreen/DepositMainScreen'
import BitcoinWalletScreen from 'App/Containers/Deposit/BitcoinWallet/BitcoinWalletScreen'
import BitcoinDepositTypeSelectionScreen from 'App/Containers/Deposit/BitcoinDepositType/BitcoinDepositTypeSelectionScreen'
import DepositQrCodeViewerScreen from 'App/Containers/Deposit/DepositQrCode/DepositQrCodeViewerScreen'
import RequestToContactScreen from 'App/Containers/Deposit/RequestToContactScreen/RequestToContactScreen'
import DepositFiatCurrenciesBankSelectionScreen from 'App/Containers/Deposit/DepositFiatCurrencies/DepositFiatCurrenciesBankSelectionScreen'
import DepositFundSelectionScreen from 'App/Containers/Deposit/DepositFundSelection/DepositFundSelectionScreen'
import DepositViewerScreen from 'App/Containers/Deposit/DepositViewer/DepositViewerScreen'
import AccountLimitScreen from 'App/Containers/Settings/AccountLimits/AccountLimitsScreen'

/**
 * The root screen contains the send screen flow's navigation.
 */
export const depositNavigator = createStackNavigator({
  DepositMainScreen: {
    screen: DepositMainScreen,
    navigationOptions: { header: null },
  },
  BitcoinDepositTypeSelectionScreen: {
    screen: BitcoinDepositTypeSelectionScreen,
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
  DepositFiatCurrenciesBankSelectionScreen: {
    screen: DepositFiatCurrenciesBankSelectionScreen,
    navigationOptions: { header: null },
  },
  DepositFundSelectionScreen: {
    screen: DepositFundSelectionScreen,
    navigationOptions: { header: null },
  },
  DepositViewerScreen: {
    screen: DepositViewerScreen,
    navigationOptions: { header: null },
  },
  AccountLimitScreen: {
    screen: AccountLimitScreen,
    navigationOptions: { header: null },
  },
})

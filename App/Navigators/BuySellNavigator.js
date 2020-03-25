import { createStackNavigator } from 'react-navigation'
import BuySellMainScreen from 'App/Containers/BuySell/BuySellMainScreen/BuySellMainScreen'
import BuySellWalletScreen from 'App/Containers/BuySell/BuySellWalletScreen/BuySellWalletScreen'
import TypeSelectionScreen from 'App/Containers/BuySell/TypeSelectionScreen/TypeSelectionScreen'
import BuySellEnterAmountScreen from 'App/Containers/BuySell/BuySellEnterAmountScreen/BuySellEnterAmountScreen'
import BuySellAmountDetailScreen from 'App/Containers/BuySell/BuySellAmountDetailScreen/BuySellAmountDetailScreen'
import BuySellAuthenticationScreen from 'App/Containers/BuySell/BuySellAuthenticationScreen/BuySellAuthenticationScreen'
import BuySellTransactionSuccessScreen from 'App/Containers/BuySell/BuySellTransactionSuccessScreen/BuySellTransactionSuccessScreen'
import CurrencySelection from 'App/Containers/BuySell/CurrencySelection/CurrencySelection'
import AccountLimitScreen from 'App/Containers/Settings/AccountLimits/AccountLimitsScreen'

/**
 * The root screen contains the buy sell screen navigation.
 */
export const BuySellNavigator = createStackNavigator({
  BuySellMainScreen: {
    screen: BuySellMainScreen,
    navigationOptions: { header: null },
  },
  TypeSelectionScreen: {
    screen: TypeSelectionScreen,
    navigationOptions: { header: null },
  },
  BuySellWalletScreen: {
    screen: BuySellWalletScreen,
    navigationOptions: { header: null },
  },
  BuySellEnterAmountScreen: {
    screen: BuySellEnterAmountScreen,
    navigationOptions: { header: null },
  },
  BuySellAmountDetailScreen: {
    screen: BuySellAmountDetailScreen,
    navigationOptions: { header: null },
  },
  BuySellAuthenticationScreen: {
    screen: BuySellAuthenticationScreen,
    navigationOptions: { header: null },
  },
  BuySellTransactionSuccessScreen: {
    screen: BuySellTransactionSuccessScreen,
    navigationOptions: { header: null },
  },
  BuySellCurrencySelection: {
    screen: CurrencySelection,
    navigationOptions: { header: null },
  },
  AccountLimitScreen: {
    screen: AccountLimitScreen,
    navigationOptions: { header: null },
  },
})

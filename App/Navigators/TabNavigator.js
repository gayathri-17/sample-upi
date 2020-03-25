import { createMaterialTopTabNavigator } from 'react-navigation'
import Tabs from 'App/Components/Tabs/Tabs'
import { DashboardNavigator } from 'App/Navigators/DashboardNavigator'
import { sendStackNavigator } from 'App/Navigators/SendNavigator'
import { depositNavigator } from 'App/Navigators/DepositNavigator'
import { SettingsStackNavigator } from './SettingsNavigator'
import { ContactStackNavigator } from 'App/Navigators/ContactNavigator'
import WalletListScreen from 'App/Containers/Wallets/WalletListScreen'
import StatementsScreen from 'App/Containers/Statements/StatementsScreen'
import ReferralScreen from 'App/Containers/ReferralScreen/ReferralScreen'
import { BuySellNavigator } from './BuySellNavigator'
import { TABS } from 'App/Constants/TransactionStatus'

/**
 * Tab Navigator to initialize to screens which has tabs.
 */

const TabNavigator = createMaterialTopTabNavigator(
  {
    [TABS.TAB_DASHBOARD]: {
      screen: DashboardNavigator,
    },
    [TABS.TAB_SEND]: {
      screen: sendStackNavigator,
    },
    [TABS.TAB_DEPOSIT]: {
      screen: depositNavigator,
    },
    [TABS.TAB_BUY_SELL]: {
      screen: BuySellNavigator,
    },
    [TABS.TAB_WALLETS]: {
      screen: WalletListScreen,
    },
    [TABS.TAB_CONTACTS]: {
      screen: ContactStackNavigator,
    },
    [TABS.TAB_STATEMENTS]: {
      screen: StatementsScreen,
    },
    [TABS.TAB_SETTINGS]: {
      screen: SettingsStackNavigator,
    },
    [TABS.TAB_REFERRAL]: {
      screen: ReferralScreen,
    },
  },
  {
    tabBarComponent: Tabs,
    lazy: true,
  }
)

export default TabNavigator

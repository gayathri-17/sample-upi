import { createStackNavigator } from 'react-navigation'
import SettingsMainScreen from 'App/Containers/Settings/SettingsMainScreen/SettingsMainScreen'
import ChangePasswordScreen from 'App/Containers/Settings/ChangePasswordScreen/ChangePasswordScreen'
import BankAccountsScreen from 'App/Containers/Settings/BankAccounts/BankAccountsScreen'
import SecurityScreen from 'App/Containers/Settings/SecurityScreen/SecurityScreen'
import ChangeTwoFactorScreen from 'App/Containers/Settings/ChangeTwoFactorScreen/ChangeTwoFactorScreen'
import AddBankTypeSelection from 'App/Containers/Settings/AddBankType/AddBankTypeSelectionScreen'
import AddUSABankAccountScreen from 'App/Containers/Settings/AddUSABankAccountScreen/AddUSABankAccountScreen'
import AddEuroBankAccountScreen from 'App/Containers/Settings/AddEuroBankAccountScreen/AddEuroBankAccountScreen'
import ProfileSettingsScreen from 'App/Containers/Settings/ProfileSettingsScreen/ProfileSettingsScreen'
import AccountLimitScreen from 'App/Containers/Settings/AccountLimits/AccountLimitsScreen'
import RegionalSettingsScreen from 'App/Containers/Settings/RegionalSettingsScreen/RegionalSettingsScreen'

/**
 * The root screen contains the send screen flow's navigation.
 */
export const SettingsStackNavigator = createStackNavigator({
  SettingsMainScreen: {
    screen: SettingsMainScreen,
    navigationOptions: { header: null },
  },
  ProfileSettingsScreen: {
    screen: ProfileSettingsScreen,
    navigationOptions: { header: null },
  },
  RegionalSettingsScreen: {
    screen: RegionalSettingsScreen,
    navigationOptions: { header: null },
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
    navigationOptions: { header: null },
  },
  BankAccountsScreen: {
    screen: BankAccountsScreen,
    navigationOptions: { header: null },
  },
  SecurityScreen: {
    screen: SecurityScreen,
    navigationOptions: { header: null },
  },
  ChangeTwoFactorScreen: {
    screen: ChangeTwoFactorScreen,
    navigationOptions: { header: null },
  },
  AddBankTypeSelection: {
    screen: AddBankTypeSelection,
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

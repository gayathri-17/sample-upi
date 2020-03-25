import { createStackNavigator } from 'react-navigation'
import DashboardMainScreen from 'App/Containers/DashboardMainScreen/DashboardMainScreen'
import ChangeTwoFactorScreen from 'App/Containers/Settings/ChangeTwoFactorScreen/ChangeTwoFactorScreen'

/**
 * The root screen contains the Contact screen flow's navigation.
 */
export const DashboardNavigator = createStackNavigator({
  DashboardMainScreen: {
    screen: DashboardMainScreen,
    navigationOptions: { header: null },
  },
  ChangeTwoFactorScreen: {
    screen: ChangeTwoFactorScreen,
    navigationOptions: { header: null },
  },
})

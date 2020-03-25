import ApplicationStyles from 'App/Theme/ApplicationStyles'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  scrollContainer: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'column',
  },
  viewContainer: {
    flex: 0.95,
  },
  submitButtonStyle: {
    alignItems: 'center',
  },
  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.05,
  },
})

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../Theme/Colors'
export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  subContainer: {
    flex: 1,
  },
  selectorContainer: {
    backgroundColor: Colors.white,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
})

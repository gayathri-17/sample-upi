import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  fieldTitle: {
    ...ApplicationStyles.screen.inputFieldTitle,
  },
  inputTextStyle: {
    marginLeft: wp(10.53),
    paddingLeft: wp(0),
    ...ApplicationStyles.screen.inputTextStyle,
  },
  textInputDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  textInputBorderNill: {
    ...ApplicationStyles.screen.textInputBorderNill,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  mainContainer: {
    flex: 1,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
})

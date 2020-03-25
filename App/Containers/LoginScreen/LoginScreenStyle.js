import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  logoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: wp(23),
    height: wp(23),
  },
  fieldContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  forgotContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: wp(10),
    marginTop: hp(1),
  },
  blackSmallTextStyle: {
    ...ApplicationStyles.screen.blackSmallTextStyle,
  },
  greenSmallTextStyle: {
    ...ApplicationStyles.screen.greenSmallTextStyle,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  lineStyle: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  submitButtonStyle: {
    marginTop: hp(3),
  },
  inputTextStyle: {
    marginTop: hp(2),
  },
})

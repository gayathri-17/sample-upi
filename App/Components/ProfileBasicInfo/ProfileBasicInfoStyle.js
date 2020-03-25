import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },

  //  Profile Info style
  scrollView: {
    width: wp(80),
  },
  fieldTitle: {
    marginTop: hp(1.5),
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  inputTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    marginTop: hp(0.5),
  },
  inputTextWidth: {
    width: wp(38),
  },
  inputDisabled: {
    paddingLeft: 0,
    marginTop: 0,
    backgroundColor: Colors.transparent,
  },
  textInputDangerBorder: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
  textInputBorderNill: {
    borderColor: Colors.transparent,
    borderWidth: 0,
  },
  twoRowContainer: {
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 0.5,
  },

  // Button View styles
  buttonView: {
    height: hp(15.87),
    width: wp(100),
    marginTop: hp(1),
  },
  changeView: {
    alignItems: 'center',
  },
  backView: {
    marginTop: hp(2.5),
    alignItems: 'center',
  },
})

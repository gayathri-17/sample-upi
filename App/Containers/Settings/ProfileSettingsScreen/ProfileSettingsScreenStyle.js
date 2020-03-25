import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
  },

  // Tire container view style
  tireContainer: {
    height: hp(5.92),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tireView: {
    height: hp(5),
    marginTop: hp(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tireText: {
    ...ApplicationStyles.screen.greenSmallTextStyle,
    marginLeft: wp(1.33),
  },

  // Tire circle view style
  tireCountView: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    marginLeft: wp(1.33),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray70,
  },
  tireCountSelected: {
    backgroundColor: Colors.mediumTurquoise,
  },
  tireCountNormal: {
    backgroundColor: Colors.gray70,
  },
  countText: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: fSize(Fonts.size.medium),
    fontFamily: Fonts.family.GothamRoundedMedium,
  },
  lineStyle: {
    ...ApplicationStyles.lineStyle,
    width: wp(100),
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

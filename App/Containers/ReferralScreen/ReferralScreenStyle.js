import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  referralSVGHolder: {
    flex: 3,
    padding: hp(3),
  },
  titleStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.white,
    textAlign: 'center',
    fontSize: fSize(22),
  },
  inputTextStyle: {
    ...ApplicationStyles.screen.inputTextStyle,
    textAlign: 'center',
    paddingLeft: wp(0),
    marginTop: hp(0.5),
  },
  topViewHolder: {
    flex: 7,
  },
  emailAddressHolder: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  referralTextHolder: {
    flex: 3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: wp(8),
  },
  bottomViewHolder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

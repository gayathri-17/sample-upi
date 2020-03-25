import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  inputStyle: {
    width: wp(80),
    height: hp(8),
    fontFamily: Fonts.family.GothamRoundedMedium,
    borderRadius: wp(2),
    color: Colors.suvaGrey,
    backgroundColor: Colors.ghostWhite,
    fontSize: fSize(Fonts.size.medium),
    paddingLeft: wp(2),
  },
  errorBackground: {
    borderColor: Colors.coralRed,
    borderWidth: 1,
  },
})

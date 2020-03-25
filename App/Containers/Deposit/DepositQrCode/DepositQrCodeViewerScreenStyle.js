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
  typeContainer: {
    height: hp(60.3),
    marginVertical: wp(1),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  infoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(17),
    marginLeft: wp(1),
    marginTop: hp(0.6),
    textAlign: 'center',
  },
  walletAddress: {
    color: Colors.mediumTurquoise,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(11),
    padding: wp(3),
    borderRadius: wp(3),
    textAlign: 'center',
    borderColor: Colors.boxBorder,
    borderWidth: wp(0.2),
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(4.43),
  },
  backButtonContainer: {
    marginTop: hp(1.2),
    height: hp(4.92),
    padding: wp(2),
  },
  copyAddressStyle: {
    color: Colors.suvaGrey,
    marginTop: wp(1),
  },
  cancelImage: {
    width: wp(13.3),
    height: hp(6.15),
  },
})

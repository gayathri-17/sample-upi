import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
export default StyleSheet.create({
  typeContainer: {
    height: hp(51.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderRadius: wp(2.6),
    ...ApplicationStyles.screen.buttonGreyShadow,
    marginBottom: wp(7),
  },
  selectedButtonStyle: {
    borderRadius: wp(2.6),
    marginBottom: wp(7),
  },
  buttonText: {
    color: Colors.curiousBlue,
  },
  arrowStyle: {
    width: wp(13),
    height: hp(10),
  },
  backImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

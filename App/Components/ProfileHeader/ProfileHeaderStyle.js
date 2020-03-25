import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'

export default StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(9.43),
    flexDirection: 'column',
    alignItems: 'center',
  },
  subContainer: {
    height: hp(9.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    ...ApplicationStyles.lineStyle,
    width: wp(100),
  },

  // User profile OR Camera icon
  cameraView: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(13),
    marginLeft: wp(5.86),
    backgroundColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: wp(7.2),
    height: wp(5.86),
  },

  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(13),
    resizeMode: 'cover',
  },

  // User name and address info
  userInfo: {
    marginLeft: wp(4.8),
    width: wp(65),
    justifyContent: 'center',
  },
  userName: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(Fonts.size.input),
    color: Colors.suvaGrey,
    textAlign: 'left',
  },
  address: {
    fontFamily: Fonts.family.GothamRoundedLight,
    fontSize: fSize(Fonts.size.small),
  },

  // End settings icon View
  selectedSettingsView: {
    marginRight: wp(5.86),
    justifyContent: 'center',
  },
  selectedSettingsIcon: {
    width: wp(6.4),
    height: wp(6.4),
  },
  borderLineStyle: {
    width: wp(100),
    height: hp(1.4),
    backgroundColor: '#98dfcf',
  },
})

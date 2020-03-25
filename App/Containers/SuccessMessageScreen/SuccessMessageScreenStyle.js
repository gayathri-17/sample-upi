import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from 'App/Theme'
import Colors from '../../Theme/Colors'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import AppStyles from 'App/Theme/ApplicationStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  logoText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(22),
  },
  mercuryText: {
    ...ApplicationStyles.screen.mercuryText,
  },
  cashText: {
    ...ApplicationStyles.screen.cashText,
  },
  onboardText: {
    marginTop: 20,
    color: Colors.mediumTurquoise,
    fontSize: fSize(22),
  },
  lineStyle: {
    ...AppStyles.lineStyle,
    marginTop: 20,
    backgroundColor: Colors.mediumTurquoise,
  },
  msgText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.mediumTurquoise,
    fontSize: fSize(15),
    marginHorizontal: 40,
    textAlign: 'center'
  },

  headerBar: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  // icon size
  iconSize: {
    width: wp(35),
    height: wp(35),
  },
})
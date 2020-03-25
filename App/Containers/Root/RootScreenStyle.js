import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ApplicationStyles, Colors } from 'App/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  logo: {
    width: wp(60),
    height: hp(30),
  },
  loaderContainer: {
    position: 'absolute',
    width: wp(100),
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dimBackground,
  },
  loadingElevation: {
    zIndex: 1000,
    elevation: 100,
  },
})

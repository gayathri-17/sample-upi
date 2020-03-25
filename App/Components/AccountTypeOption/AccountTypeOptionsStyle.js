import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'
import Colors from '../../Theme/Colors'
import Fonts from '../../Theme/Fonts'

export const Style = StyleSheet.create({
  bgContainerStyle: {
    height: hp(15.65),
    position: 'absolute',
    width: wp(79.4),
    zIndex: 100,
  },
  checkedImageContaner: {
    bottom: 0,
    margin: wp(3),
    position: 'absolute',
    right: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: hp(1),
    flexDirection: 'row',
    height: hp(14.65),
    marginLeft: wp(0.6),
    marginTop: wp(1.2),
    paddingLeft: wp(5),
    width: wp(78.4),
  },
  mainContainerBorder: {
    borderColor: Colors.viewBorderColor,
    borderWidth: 1,
  },
  personalImageStyle: {
    height: hp(8.91),
    width: wp(17.6),
  },
  tickImageStyle: {
    height: hp(2.9),
    width: wp(6.4),
  },
  titleText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(20),
    marginLeft: wp(5),
    textAlign: 'center',
  },
  titleTextSelected: {
    color: Colors.mediumTurquoise,
  },
  titleTextUnSelected: {
    color: Colors.suvaGrey,
  },
})
export const shadowSelectedOpt = {
  height: hp(15.2),
  width: wp(79.5),
  color: Colors.mediumTurquoise,
  border: hp(0.2),
  radius: hp(1),
  opacity: 0.15,
  x: 0,
  y: 3,
}
export const shadowunSelectOpt = {
  height: hp(15.2),
  width: wp(79.5),
  color: Colors.white,
  border: hp(0.2),
  radius: hp(1),
  opacity: 0.15,
  x: 0,
  y: 3,
}

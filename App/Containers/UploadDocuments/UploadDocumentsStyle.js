import { StyleSheet } from 'react-native'
import { ApplicationStyles } from 'App/Theme'
import Colors from '../../Theme/Colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Fonts from '../../Theme/Fonts'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  documentContainer: {
    width: wp(78.4),
    height: hp(6.6),
    borderRadius: wp(2),
    marginTop: hp(3.2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  documentMainContainer: {
    alignItems: 'center',
  },
  documentText: {
    flex: 0.8,
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
  },
  documentTextNill: {
    color: Colors.suvaGrey,
  },
  documentTextDanger: {
    color: Colors.coralRed,
  },
  documentTextSuccess: {
    color: Colors.mediumTurquoise,
  },
  uploadImageStyle: {
    height: hp(2.9),
    width: wp(6.4),
  },
  viewDangerBorder: {
    ...ApplicationStyles.screen.textInputDangerBorder,
  },
  viewBorderNill: {
    borderColor: Colors.dropDownBorder,
    borderWidth: 1,
  },
  viewSuccessBorder: {
    borderColor: Colors.mediumTurquoise,
    borderWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: hp(4.43),
  },
  backButtonContainer: {
    ...ApplicationStyles.screen.backButtonContainer,
  },
  progress: {
    margin: 10,
  },
  backTextStyle: {
    ...ApplicationStyles.screen.backTextStyle,
  },
})

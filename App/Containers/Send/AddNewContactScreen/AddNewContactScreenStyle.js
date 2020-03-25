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
  //  Header container
  titleContainer: {
    width: wp(79),
    height: hp(12.68),
    marginTop: hp(4.05),
  },
  titleTextContainer: {
    alignItems: 'center',
  },
  titleTxt: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(16),
  },
  currencyView: {
    marginTop: hp(1.59),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  curencyIconSize: {
    height: wp(13.86),
    width: wp(13.86),
  },
  titleLine: {
    backgroundColor: Colors.lightGrey,
    height: hp(0.1),
    marginTop: hp(2),
    width: wp(79),
  },

  // Input Card View
  inputCardContainer: {
    backgroundColor: Colors.ghostWhite,
    marginTop: hp(1.59),
    height: hp(22.11),
    width: wp(79),
    borderRadius: wp(3.2),
  },
  inputViwe: {
    marginTop: hp(2.95),
    height: hp(4.43),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  placeholderText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(Fonts.size.extraSmall),
    marginLeft: wp(4.26),
  },
  alignTextRight: {
    marginLeft: 0,
    marginRight: wp(2.26),
  },

  inputTextStyle: {
    marginLeft: wp(3),
    width: wp(58.4),
    borderRadius: wp(2.66),
    paddingTop: hp(1.1),
    fontFamily: Fonts.family.GothamRoundedMedium,
    paddingBottom: hp(1.1),
    color: Colors.suvaGrey,
    backgroundColor: Colors.white,
    fontSize: fSize(Fonts.size.extraSmall),
    paddingLeft: wp(2.13),
    shadowColor: Colors.suvaGrey,
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: hp(0.5),
  },
  alignRight: {
    marginLeft: 0,
    marginRight: wp(3),
  },
  // Scan QR code style
  scanQRCodeView: {
    marginTop: hp(1.97),
    paddingRight: wp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  scanQRText: {
    marginRight: wp(2.5),
  },
  qrCodeIcon: {
    width: wp(6.66),
    height: wp(6.66),
  },

  // Identify contact with email view
  identifyWIthEmailView: {
    backgroundColor: Colors.ghostWhite,
    marginTop: hp(1.47),
    width: wp(79),
    borderRadius: wp(3.2),
  },
  textWithIconView: {
    height: hp(3.32),
    width: wp(79),
    marginTop: hp(1.72),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addEmail: {
    width: wp(63),
  },
  questionview: {
    marginBottom: wp(3),
    marginLeft: wp(3.2),
  },
  // Yes or No Checkbox style
  checkboxView: {
    marginVertical: hp(1),
    paddingRight: wp(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkbox: {
    width: wp(17.33),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxIcon: {
    width: wp(4.26),
    height: wp(4.26),
  },
  checkboxText: {
    marginLeft: wp(1.6),
  },
  // Identify with email Input view
  identifyEmailInput: {
    height: hp(4.43),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },

  // Add contact button style
  addNewContactView: {
    ...ApplicationStyles.screen.container,
    marginBottom: hp(7.75),
    flexDirection: 'column-reverse',
  },

  // contact added success modal
  tickViewContainer: {
    flex: 0.6,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.mediumTurquoise,
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
  },
  modalContainer: {
    flex: 1,
  },
  marginTop: {
    marginTop: hp(1),
  },
  sendMoneyContainer: {
    flex: 0.4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contactAddedTextStyle: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(18),
    color: Colors.mediumTurquoise,
  },
})

import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from 'App/Theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: wp(2),
  paddingHorizontal: hp(2),
  borderBottomWidth: 1,
  borderBottomColor: Colors.viewBorderColor,
}

const optionTextStyle = {
  flex: 1,
  textAlign: 'left',
  color: Colors.black,
  fontSize: fSize(16),
  fontFamily: Fonts.family.GothamRoundedBook,
}

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.dimBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    flex: 0,
    color: Colors.black,
    fontSize: fSize(16),
    fontFamily: Fonts.family.GothamRoundedBook,
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
    width: width * 0.8,
    maxHeight: height * 0.7,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  cancelContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 0,
    backgroundColor: Colors.mediumTurquoise,
    paddingVertical: wp(3),
    paddingHorizontal: hp(2),
    borderRadius: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: fSize(16),
    color: Colors.white,
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  filterTextInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dropDownBorderBottom,
  },
  filterTextInput: {
    paddingVertical: wp(2),
    paddingHorizontal: hp(3),
    flex: 0,
    fontSize: fSize(16),
    fontFamily: Fonts.family.GothamRoundedBook,
    height: hp(6),
    color: Colors.suvaGrey,
  },
  categoryStyle: {
    ...optionStyle,
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: Colors.black,
    fontFamily: Fonts.family.GothamRoundedBook,
    fontSize: fSize(16),
  },
  optionStyle: {
    ...optionStyle,
  },
  optionStyleLastChild: {
    borderBottomWidth: 0,
  },
  optionTextStyle: {
    ...optionTextStyle,
  },
  selectedOptionStyle: {
    ...optionStyle,
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0,
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700',
  },
  noResults: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: fSize(22),
    fontFamily: Fonts.family.GothamRoundedBook,
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

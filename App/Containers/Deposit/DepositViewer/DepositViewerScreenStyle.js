import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from 'App/Theme'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFValue as fSize } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankDetailContainer: {
    width: wp(73.8),
  },
  dataContainer: {
    flexDirection: 'row',
  },
  titleText: {
    backgroundColor: Colors.ghostWhite,
    flex: 0.4,
    padding: wp(2),
    color: Colors.suvaGrey,
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedMedium,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  valueText: {
    flex: 0.6,
    padding: wp(2),
    fontSize: fSize(12),
    fontFamily: Fonts.family.GothamRoundedLight,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  headerText: {
    fontFamily: Fonts.family.GothamRoundedMedium,
    color: Colors.suvaGrey,
    fontSize: fSize(14),
    marginVertical: wp(4),
    textAlign: 'center',
  },
  wireTitleText: {
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedMedium,
    fontSize: fSize(12),
    backgroundColor: Colors.ghostWhite,
    borderRadius: wp(2),
    color: Colors.suvaGrey,
    padding: wp(1.5),
    marginTop: wp(4),
  },
  penaltyDest: {
    textAlign: 'center',
    fontFamily: Fonts.family.GothamRoundedLight,
    fontSize: fSize(12),
    marginTop: wp(3),
    color: Colors.suvaGrey,
    marginBottom: wp(3),
  },
  backButtonContainer: {
    padding: wp(2),
    marginTop: wp(3),
  },
  backTextStyle: {
    textAlign: 'center',
    ...ApplicationStyles.screen.backTextStyle,
  },
})

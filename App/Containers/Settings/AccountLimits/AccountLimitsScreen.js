import React, { Component } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import styles from './AccountLimitScreenStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openEmail } from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'App/Theme'
import Limits from 'App/Assets/Images/Svg/Limits'
import AddAppColor from 'App/Assets/Images/Svg/AddAppColor'
import I18n from 'App/Localization/I18n'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import { getLimits, currencyFormat } from 'App/Components/Utils/CurrencyDefinder'
/**
 *  user can able to see their account limits here
 */

export class AccountLimitScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.props.getBalanceAndLimit(DefaultStrings.TYPE_BTC)
  }

  render() {
    // to access current  props
    const { transactionLimit } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer} testID={'titleView'}>
          <Text style={styles.titleitleText}>{I18n.t('ACCOUNT_LIMITS')}</Text>
          <Limits width={styles.imageStyle.width} height={styles.imageStyle.height} />
        </View>
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={styles.borderLineStyle}
        />
        {transactionLimit != null && (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {transactionLimit.deposit != null &&
              this.renderLimitItem(
                I18n.t('DEPOSIT'),
                transactionLimit.deposit.total,
                transactionLimit.deposit.available
              )}
            {transactionLimit.withdraw != null &&
              this.renderLimitItem(
                I18n.t('WITHDRAW'),
                transactionLimit.withdraw.total,
                transactionLimit.withdraw.available
              )}
            {transactionLimit.fiat_transfer != null &&
              this.renderLimitItem(
                I18n.t('FIAT_TRANSFER'),
                transactionLimit.fiat_transfer.total,
                transactionLimit.fiat_transfer.available
              )}
            {transactionLimit.buy != null &&
              this.renderLimitItem(
                I18n.t('BUY'),
                transactionLimit.buy.total,
                transactionLimit.buy.available
              )}
            {transactionLimit.sell != null &&
              this.renderLimitItem(
                I18n.t('SELL'),
                transactionLimit.sell.total,
                transactionLimit.sell.available
              )}
            {transactionLimit.transfer_external != null &&
              this.renderLimitItem(
                I18n.t('TRANSFER_EXTERNAL'),
                transactionLimit.transfer_external.total,
                transactionLimit.transfer_external.available
              )}
            {transactionLimit.transfer_internal != null &&
              this.renderLimitItem(
                I18n.t('TRANSFER_INTERNAL'),
                transactionLimit.transfer_internal.total,
                transactionLimit.transfer_internal.available
              )}
          </ScrollView>
        )}
        <Button
          style={[styles.backButtonStyle, styles.bottomMargin]}
          text={I18n.t('BACK')}
          withBorder={true}
          onClick={this.onClickBack}
        />
      </SafeAreaView>
    )
  }

  /**
   * on click back function
   */
  onClickBack = () => {
    Navigator.goBack()
  }

  /**
   * used to render the Limit item by given fields
   * @param {String} title item type , it refers which type of limit (Buy, deposit, etc..)
   * @param {number} totalLimit it refers the total available limit available in this type
   * @param {number} availableLimit it refets howmuch limit that user have now
   */
  renderLimitItem = (title, totalLimit, availableLimit) => {
    const usedLimit = totalLimit - availableLimit
    const usedFlexValue = usedLimit === 0 ? 0 : usedLimit / totalLimit // used to dynamic change of thr progress
    const usedPercent = usedFlexValue * 100
    const availablePercent = 100 - usedPercent
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeaderContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={[styles.itemTitle, styles.itemAmount]}>{currencyFormat(totalLimit)}</Text>
        </View>
        <View style={styles.itemProgressContainer}>
          <Text style={styles.itemTitle}>{currencyFormat(usedLimit)}</Text>
          <Text style={[styles.itemTitle, styles.itemSubTitle]}>
            {currencyFormat(availableLimit)}
          </Text>
        </View>
        <View style={styles.progressParent}>
          <Text style={[styles.fillProgress, { flex: usedFlexValue }]} />
        </View>
        <View style={[styles.itemProgressContainer, styles.itemPercentContainer]}>
          <Text style={styles.usedTextStyle}>
            {usedPercent.toFixed(2)}
            {I18n.t('PERCENT_USED')}
          </Text>
          <Text style={[styles.usedTextStyle, styles.leftPercentText]}>
            {availablePercent.toFixed(2)}
            {I18n.t('PERCENT_LEFT')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.requestLimitContainer}
          onPress={this.onLimitIncreaseClicked.bind(this, title)}
        >
          <Text style={styles.txtRequestLimit}>{I18n.t('REQUEST_LIMIT_INCREASE')}</Text>
          <AddAppColor
            width={styles.limitImageStyle.width}
            height={styles.limitImageStyle.height}
          />
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * used to open the mail Application for request more limit
   * @param {String} title  it refers which type of limit (Buy, deposit, etc..)
   */
  onLimitIncreaseClicked = (title) => {
    openEmail(
      DefaultStrings.SUPPORT_EMAIL,
      I18n.t('INCREASE_LIMIT_MAIL_SUBJECT'),
      I18n.t('INCREASE_LIMIT_DESCRIPTION'),
      title
    )
  }
}
AccountLimitScreen.propTypes = {
  getBalanceAndLimit: PropTypes.func,
  transactionLimit: PropTypes.object,
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  transactionLimit: getLimits(),
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency) => dispatch(UserActions.getBalanceAndTransactionLimit(currency)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountLimitScreen)

import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import Navigator from 'App/Services/NavigationService'
import styles from './DepositFundSelectionScreenStyle'
import Line from 'App/Components/Line/Line'
import {
  getCurrencySymbol,
  getImage,
  getWalletName,
  currencyFormat,
} from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'

/**
 *user can select ther fund by their bank account
 */
export class DepositFundSelectionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transferAmount: props.navigation.state.params.amount,
      screenType: props.navigation.state.params.screenType,
      screenName: props.navigation.state.params.screenName,
      selectedBank: props.navigation.state.params.selectedBank,
      sof: props.navigation.state.params.sourceOfFund,
      paid: 0,
      fee: 0,
      hash: '',
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    // to access current state
    const { transferAmount, selectedBank, sof } = this.state
    const depositData = {
      amount: transferAmount,
      sof: sof,
      accountId: selectedBank.uuid,
    }
    this.props.processFiatDeposit(depositData, this.feeDatas)
  }

  render() {
    // to access current state
    const { transferAmount, screenType, screenName, fee, paid, selectedBank } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* amount detail container */}
          <View style={[styles.detailContainer, styles.margin]}>
            <View style={styles.detailTransferContainer}>
              <View style={styles.detailTextContainer} testID={'titleContaoner'}>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                  {I18n.t('YOU_TRANSFER')}
                </Text>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                  {getCurrencySymbol(screenType)}
                  {currencyFormat(
                    parseFloat(transferAmount).toFixed(2),
                    CurrencySeperatorType.USD
                  )}{' '}
                  {screenName}
                </Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>{I18n.t('FEE')}</Text>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                  {getCurrencySymbol(screenType)}
                  {currencyFormat(fee.toFixed(2), CurrencySeperatorType.USD)} {screenName}
                </Text>
              </View>
            </View>
            <Line styleProp={styles.lineStyle} />
            <View style={styles.detailGetContainer}>
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                  {I18n.t('YOU_GET')}
                </Text>
                <Text style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}>
                  {getCurrencySymbol(screenType)}
                  {currencyFormat(paid.toFixed(2), CurrencySeperatorType.USD)} {screenName}
                </Text>
              </View>
            </View>
          </View>
          {/* from to view */}
          <View style={[styles.fromToContainer, styles.margin]}>
            <View style={styles.fromToHeaderContainer}>
              <Text style={styles.fromToTextStyle}>{I18n.t('FROM_FUND')}</Text>
              <Text style={[styles.fromToAddressTextStyle, styles.toTextFlex]}>
                {selectedBank.alias}
              </Text>
            </View>
            <View style={styles.fromToHeaderContainer}>
              <Text style={styles.fromToTextStyle}>{I18n.t('TO')}</Text>
              <View style={styles.textLogoContainer}>
                {getImage(screenType)}
                <Text style={[styles.fromToAddressTextStyle, styles.leftMargin]}>
                  {getWalletName(screenType)}
                </Text>
              </View>
            </View>
          </View>
          {/* Forward and backward view */}
          <View style={styles.arrowContainer}>
            <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
              <TouchableOpacity onPress={this.onPressBackward} testID="forwardArrow">
                <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressForward} testID="backwardArrow">
                <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * calculated fee data from API
   * @param {*} data API fee datas
   */
  feeDatas = (data) => {
    const total = data.total ? data.total : data.totalReceive ? data.totalReceive : 0.0
    this.setState({
      fee: data.fee === undefined ? 0.0 : data.fee,
      paid: total,
      hash: data.hash,
      wireCode: data.wireCode,
    })
  }

  /**
   * After getting all details and Make deposit API call
   */
  onPressForward = () => {
    // to access current state
    const { isLastIndex, otherValue, screenType, screenName, fee, wireCode, hash } = this.state
    if (isLastIndex && otherValue.length < 3) {
      this.setState({ isValidOther: false })
      return
    }
    const confirmData = {
      hash: hash,
    }
    this.props.confirmFiatDeposit(confirmData, () => {
      Navigator.navigate(NavKeys.DEPOSIT_VIEWER_SCREEN, {
        screenType: screenType,
        fee: fee,
        wireCode: wireCode,
        screenName: screenName,
      })
    })
  }

  /**
   * Navigate to previous screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }
}
DepositFundSelectionScreen.propTypes = {
  commissions: PropTypes.object,
  processFiatDeposit: PropTypes.func,
  confirmFiatDeposit: PropTypes.func,
  navigation: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => ({
  commissions: state.user.commissions,
})

export const mapDispatchToProps = (dispatch) => ({
  processFiatDeposit: (data, successFn) =>
    dispatch(UserActions.processFiatDeposit(data, successFn)),
  confirmFiatDeposit: (data, successFn) =>
    dispatch(UserActions.confirmFiatDeposit(data, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositFundSelectionScreen)

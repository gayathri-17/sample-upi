import React, { Component } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styles from './DepositFiatCurrenciesBankSelectionScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import RNPickerSelect from 'react-native-picker-select'
import DropDownGray from 'App/Assets/Images/Svg/DropDownGray'
import EnterAmount from 'App/Components/EnterAmount/EnterAmount'
import ProgressCircle from 'react-native-progress-circle'
import { getCurrencyColor, showAlert, showAlertWithBack } from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import LimitModel from 'App/Components/Limits/LimitModel'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'

/**
 *  user can deposit with USD and EURO here
 */

export class DepositFiatCurrenciesBankSelectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenType: props.navigation.state.params.screenType,
      screenName: props.navigation.state.params.screenName,
      selectedBank: '',
      bankList: [],
      usedLimit: '0',
      balance: '0',
      selectedValue: '',
      amount: '',
      keyboardVisible: false,
      bankDatas: [],
      selectedBankData: {},
      fundsList: DefaultStrings.FUNDLIST_ITEMS,
      isLastIndex: false,
      otherValue: '',
      isValidOther: true,
      selectedFund: DefaultStrings.FUNDLIST_ITEMS[0].value,
      fundLastIndex: DefaultStrings.FUNDLIST_ITEMS.length - 1,
      limitModal: false,
      balanceLimit: '0',
      totalLimit: '0',
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    const { screenType } = this.state
    this.props.getBalanceAndLimit(screenType)
    this.props.getBankAccounts(this.updateDataToState, showAlert)
    this.props.getCommissions()
  }

  /**
   * update the user back Account list to state
   */
  updateDataToState = (list) => {
    const { screenType } = this.state
    let filteredAccount = []
    list.map((bank) => {
      if (bank.currency === screenType) filteredAccount.push(bank)
    })
    if (filteredAccount.length === 0) {
      showAlertWithBack(I18n.t('ALERT'), I18n.t('PLEASE_ADD_BANK_ACCOUNT'))
      return
    }
    this.setState({
      bankDatas: filteredAccount,
      bankList: filteredAccount.map((bank) => {
        return {
          label: bank.alias,
          value: bank.uuid,
        }
      }),
    })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    const { transactionLimit, balanceForCoin } = this.props
    if (prevProps.transactionLimit !== transactionLimit) {
      this.calculateUserLimitPercentage(transactionLimit)
      this.getBalanceBasedOnCurrency(balanceForCoin)
    }
  }

  render() {
    // access current state
    const {
      screenType,
      amount,
      bankList,
      balance,
      usedLimit,
      selectedValue,
      fundsList,
      isLastIndex,
      otherValue,
      isValidOther,
      selectedFund,
      limitModal,
      balanceLimit,
      totalLimit,
    } = this.state
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container} enabled>
        <DashboardTitle
          testID={'titleView'}
          title={I18n.t('DEPOSIT')}
          currency={screenType}
          subTitle={I18n.t('FROM')}
          name={I18n.t('TYPE_BANK_ACCOUNT')}
        />
        <ScrollView>
          <View style={styles.parentContainer}>
            <Text style={styles.sourceText}>{I18n.t('SOURCE_BANK_ACCOUNT')}</Text>
            <View style={styles.dropDownStyleMargin}>
              <RNPickerSelect
                testID={'bankPicker'}
                style={{
                  inputIOS: styles.bankPickerStyle,
                  inputAndroid: styles.bankPickerStyle,
                  iconContainer: styles.dropdownIconStyle,
                }}
                placeholder={{}}
                onValueChange={(itemValue, index) => {
                  this.onSelectBankAccount(itemValue, index)
                }}
                value={selectedValue}
                items={bankList}
                Icon={this.dropDownArrowView}
              />
              <Text style={styles.manditoryStar}>*</Text>
            </View>
            <Text style={styles.requiredFieldText}>{I18n.t('REQUIRED_FIELD')}</Text>
            <Text style={styles.sourceText}>{I18n.t('SOURCE_BANK_FUNDS')}</Text>
            <View style={styles.dropDownStyleMargin}>
              <RNPickerSelect
                testID={'countryPicker'}
                style={{
                  inputIOS: isLastIndex ? styles.fundPickerNillBg : styles.fundPickerStyle,
                  inputAndroid: isLastIndex ? styles.fundPickerNillBg : styles.fundPickerStyle,
                  iconContainer: styles.dropdownIconStyle,
                }}
                placeholder={{}}
                onValueChange={(itemValue, index) => {
                  this.onSelectFund(itemValue, index)
                }}
                value={selectedFund}
                items={fundsList}
                Icon={this.dropDownArrowView}
              />
              {!isLastIndex && <Text style={styles.manditoryStar}>*</Text>}
            </View>
            {isLastIndex && (
              <View style={styles.dropDownStyleMargin}>
                <TextInput
                  returnKeyType={'done'}
                  style={[
                    styles.fundPickerStyle,
                    !isValidOther ? styles.textInputDangerBorder : {},
                  ]}
                  value={otherValue}
                  onChangeText={this.onChangeOtherText}
                />
                <Text style={[styles.manditoryStar, !isValidOther ? styles.validOtherText : {}]}>
                  *
                </Text>
              </View>
            )}
            <Text style={[styles.requiredFieldText, !isValidOther ? styles.validOtherText : {}]}>
              {I18n.t('REQUIRED_FIELD')}
            </Text>
            <EnterAmount
              currency={screenType}
              balance={balance}
              amount={amount}
              onPressForward={this.updateAmount}
            />
            <TouchableOpacity style={styles.rowStyle} onPress={this.onPressLimit}>
              <Text style={styles.smallTextStyle}>{I18n.t('LIMIT')}</Text>
              <View style={styles.progressViewStyle}>
                <ProgressCircle
                  percent={parseInt(usedLimit)}
                  radius={styles.progressStyle.width}
                  borderWidth={styles.progressStyle.borderWidth}
                  color={getCurrencyColor(screenType)}
                  shadowColor={styles.progressStyle.shadowColor}
                  bgColor={styles.progressStyle.color}
                >
                  <Text style={styles.percentTextStyle}>{parseInt(usedLimit)}%</Text>
                </ProgressCircle>
              </View>
            </TouchableOpacity>
            <LimitModel
              isShow={limitModal}
              onClickClose={this.onClickClose}
              usedLimit={usedLimit}
              currencyName={screenType}
              totalLimit={totalLimit}
              defaultCurrency={screenType}
              availabeLimit={balanceLimit}
              viewRef={this.state.viewRef}
              limitText={I18n.t('YOUR_DEPOSIT_LIMITS')}
            />
            <View style={styles.arrowContainer}>
              <View style={[styles.arrowRowStyle, styles.arrowContainerStyle]}>
                <TouchableOpacity onPress={this.onPressBackward} testID="forwardArrow">
                  <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressForward} testID="back">
                  <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  /**
   * update amount state change
   * @param {String} value user entered amount
   */
  updateAmount = (value) => {
    this.setState({ amount: value })
  }

  /**
   * open send limit modal
   */
  onPressLimit = () => {
    this.setState({ limitModal: true })
  }

  /**
   * close send limit modal
   */
  onClickClose = () => {
    this.setState({ limitModal: false })
  }
  /**
   * on change other fund value
   * @param {String} text - refers other fund text
   */
  onChangeOtherText = (text) => {
    const validData = text.length >= 3
    this.setState({ otherValue: text, isValidOther: validData })
  }

  /**
   * Dropdown view function
   * @returns {DropDownGray} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DropDownGray
        width={styles.dropDownImageStyle.width}
        height={styles.dropDownImageStyle.height}
      />
    )
  }
  /**  update selected fund type to picker
   * @param {String} value selected fund name
   * @param {number} index selected fund type list position
   */
  onSelectFund = (itemValue, index) => {
    this.setState({
      selectedFund: itemValue,
      isLastIndex: index === this.state.fundLastIndex,
      isValidOther: true,
    })
  }

  /**
   * enable the ekyboard view for getting input
   */
  enableKeyboardVisible = () => {
    const { isLastIndex, otherValue } = this.state
    if (isLastIndex && otherValue.length < 3) {
      this.setState({ isValidOther: false })
      return
    }
    this.setState({ keyboardVisible: true })
  }

  /**
   * show amount enter View
   * @param {String} amount user entered amount
   */
  onKeyboardBackPressed = (amount) => {
    this.setState({ amount, keyboardVisible: false })
  }

  /**
   * navigate to the previous screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }

  /**
   * move to the fund selection screen
   */
  onPressForward = () => {
    const {
      screenType,
      selectedBankData,
      screenName,
      isLastIndex,
      otherValue,
      selectedFund,
      amount,
    } = this.state
    const { commissions } = this.props
    if (screenType === CurrencyType.USD) {
      if (
        selectedBankData.type === DefaultStrings.TYPE_DOMESTIC &&
        amount <= parseInt(commissions.deposit_wire_transfer_domestic)
      ) {
        showAlert(
          `${I18n.t('AMOUNT_GRETAER_THAN')} ${parseInt(commissions.deposit_wire_transfer_domestic)}`
        )
        return
      } else if (
        selectedBankData.type === DefaultStrings.TYPE_INTERNATIONAL &&
        amount <= parseInt(commissions.deposit_wire_transfer_international)
      ) {
        showAlert(
          `${I18n.t('AMOUNT_GRETAER_THAN')} ${parseInt(
            commissions.deposit_wire_transfer_international
          )}`
        )
        return
      }
    } else if (amount <= 60) {
      // defaults to euro
      showAlert(I18n.t('AMOUNT_GRETAER_THAN_SIXTY'))
      return
    }

    this.setState(
      {
        keyboardVisible: false,
        amount: amount,
      },
      () => {
        Navigator.navigate(NavKeys.DEPOSIT_FUND_SELECTION, {
          screenType: screenType,
          amount: amount,
          selectedBank: selectedBankData,
          screenName: screenName,
          sourceOfFund: isLastIndex ? otherValue : selectedFund,
        })
      }
    )
  }

  /**  update selected bank account to picker
   * @param {String} value selected bank name
   * @param {number} index selected bank's list position
   */
  onSelectBankAccount = (value, index) => {
    this.setState({
      selectedValue: value,
      selectedBank: this.state.bankList[index].label,
      selectedBankData: this.state.bankDatas[index],
    })
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {object} transactionLimit - refers limit available in your wallet.
   * Here we calculate used linit percentage based on limit available in your weekly limit
   */
  calculateUserLimitPercentage(transactionLimit) {
    if (this.state.screenType === CurrencyType.USD) {
      let total = transactionLimit.USD.deposit.total
      let balance = transactionLimit.USD.deposit.available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, balanceLimit: balance, totalLimit: total })
    } else {
      let total = transactionLimit.EUR.deposit.total
      let balance = transactionLimit.EUR.deposit.available
      let used = total - balance
      let usedLimit = (used / total) * 100
      this.setState({ usedLimit, balanceLimit: balance, totalLimit: total })
    }
  }

  /**
   * set balance to current state
   * @param {object} balance - refers balance available in your wallet.
   * Here we set balance state from balance object
   */
  getBalanceBasedOnCurrency(balance) {
    const { screenType } = this.state
    balance && balance[screenType] && this.setState({ balance: balance[screenType][0].balance })
  }
}
DepositFiatCurrenciesBankSelectionScreen.propTypes = {
  getBalanceAndLimit: PropTypes.func,
  balanceForCoin: PropTypes.object,
  transactionLimit: PropTypes.object,
  getBankAccounts: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  getCommissions: PropTypes.func,
  commissions: PropTypes.object,
}

export const mapStateToProps = (state) => ({
  balanceForCoin: state.user.balanceBasedOnCoinSelected,
  transactionLimit: state.user.transactionLimit,
  commissions: state.user.commissions,
})

export const mapDispatchToProps = (dispatch) => ({
  getBalanceAndLimit: (currency) => dispatch(UserActions.getBalanceAndTransactionLimit(currency)),
  getBankAccounts: (successFn, failureFn) =>
    dispatch(UserActions.getBankAccounts(successFn, failureFn)),
  getCommissions: () => dispatch(UserActions.getCommissions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositFiatCurrenciesBankSelectionScreen)

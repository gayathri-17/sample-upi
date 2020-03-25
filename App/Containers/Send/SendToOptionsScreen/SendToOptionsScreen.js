import React from 'react'
import styles from './SendToOptionsScreenStyle'
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Line from 'App/Components/Line/Line'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DotImage from 'App/Assets/Images/Svg/DotImage'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import RNPickerSelect from 'react-native-picker-select'
import DropDownArrowGrey from 'App/Assets/Images/Svg/DropDownArrowGrey'
import GreyPlusCircle from 'App/Assets/Images/Svg/GreyPlusCircle'
import UserActions from 'App/Stores/User/Actions'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import CurrencyType from 'App/Constants/CurrencyType'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import Currencies from 'App/Assets/Images/Svg/Currencies'
import CommonActions from 'App/Stores/Common/Actions'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'

/**
 * User can see the options to send the money
 */
export class SendToOptionsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      selectedValue: '',
      selectedBank: {
        uuid: '',
        to: '',
        type: DefaultStrings.TYPE_BANK_ACCOUNT,
      },
      bankAccounts: [],
      currencyType: props.navigation.state.params.currencyType,
      currencyName: props.navigation.state.params.currencyName,
      bankAccRequestFailure: false,
      requestErrMessage: '',
    }
  }

  render() {
    // To access current component state with simplified field of state
    const {
      selectedOption,
      bankAccounts,
      selectedValue,
      currencyType,
      bankAccRequestFailure,
      requestErrMessage,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View testID={'titleContainer'} style={styles.titleContainer}>
          <View style={styles.titleDotContainer}>
            <DotImage width={styles.dotIconSize.width} height={styles.dotIconSize.height} />
            <Text style={styles.titleTxt}>{I18n.t('SEND_TO')}</Text>
            <SvgIcon
              width={styles.curencyIconSize.width}
              height={styles.curencyIconSize.height}
              xml={currencyType === CurrencyType.USD ? Currencies.USD : Currencies.Euro}
            />
            <Text style={[styles.titleTxt, styles.textowerCase]}>{I18n.t('TO')}</Text>
          </View>
          <Line styleProp={styles.titleLine} />
        </View>
        <View testID={'contentContainer'} style={styles.contentContainerView}>
          <View style={styles.myBankAccountView}>
            <Button
              text={I18n.t('MY_BANK_ACCOUNT')}
              withBg={selectedOption === DefaultStrings.MY_BANK_ACCOUNT}
              testID={'bankAccount'}
              style={
                selectedOption === DefaultStrings.MY_BANK_ACCOUNT
                  ? styles.selectedButtonStyle
                  : styles.buttonStyle
              }
              textStyle={selectedOption === DefaultStrings.MY_BANK_ACCOUNT ? {} : styles.buttonText}
              onClick={this.onMyBankAccountClick}
            />
          </View>
          <View style={styles.contactView}>
            {(selectedOption === '' || selectedOption === DefaultStrings.A_CONTACT) && (
              <Button
                text={I18n.t('A_CONTACT')}
                withBg={false}
                testID={'openContact'}
                style={styles.buttonStyle}
                textStyle={styles.buttonText}
                onClick={this.onContactClick}
              />
            )}
            {selectedOption === DefaultStrings.MY_BANK_ACCOUNT && (
              <>
                <RNPickerSelect
                  testID={'BankAccountPicker'}
                  style={{
                    inputIOS: styles.dropDownInputStyle,
                    inputAndroid: styles.dropDownInputStyle,
                    iconContainer: styles.dropdownIconStyle,
                  }}
                  placeholder={{}}
                  onValueChange={(itemValue) => this.onSelectBankAccount(itemValue)}
                  value={selectedValue}
                  items={bankAccounts}
                  Icon={this.dropDownArrowView}
                  onDonePress={this.onDoneClick.bind(this)}
                />
                <View style={styles.addAccountContainer}>
                  <Text style={styles.addAccountText}>{I18n.t('ADD_NEW_BANK_ACCOUNT')}</Text>
                  <TouchableOpacity onPress={this.onAddBankClicked} style={styles.plusCircleIcon}>
                    <GreyPlusCircle />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
            <TouchableOpacity onPress={this.onClickBack} testID="forwardArrow">
              <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onDoneClick} testID="back">
              <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
            </TouchableOpacity>
          </View>
        </View>
        <ErrorModal
          isShow={bankAccRequestFailure}
          isHideClose={false}
          onCLickClose={this.goBack}
          onClickSubmit={this.onMyBankAccountClick}
          submitButtonTitle={I18n.t('RETRY')}
          errorMessage={requestErrMessage || I18n.t('NETWORK_ERROR')}
        />
      </SafeAreaView>
    )
  }

  /**
   * go back to previous screen
   */
  goBack = () => {
    Navigator.goBack()
  }

  /**
   * Set dropdown arrow view function
   * @returns {DropDownArrow} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DropDownArrowGrey width={styles.dropDownStyle.width} height={styles.dropDownStyle.height} />
    )
  }
  /**
   * navigate to add bank account depends on fiat type
   */
  onAddBankClicked = () => {
    const { currencyType } = this.state
    Navigator.navigate(
      currencyType === CurrencyType.USD
        ? NavKeys.ADD_USA_BANK_ACCOUNT
        : NavKeys.ADD_EUR_BANK_ACCOUNT,
      { onBankCallback: this.onMyBankAccountClick.bind(this) }
    )
  }

  // show my bank account info
  onMyBankAccountClick = () => {
    // change bank account page UI
    this.setState({ selectedOption: DefaultStrings.MY_BANK_ACCOUNT, bankAccRequestFailure: false })
    this.props.getBankAccounts(this.updateDataToState, (err) => {
      // failure callback
      this.setState({ errorMessage: err, bankAccRequestFailure: true })
    })
  }

  /**
   * update bank accounts to current state
   * @param {list} Array get array from bank account api
   */
  updateDataToState = (list) => {
    const { currencyType } = this.state
    this.props.showOrHideLoader(true)
    let filteredAccount = []
    list.map((bank) => {
      if (bank.currency === currencyType) filteredAccount.push(bank)
    })

    this.setState({ selectedValue: filteredAccount[0] ? filteredAccount[0].alias : '' })
    this.setState(
      {
        selectedBank: filteredAccount[0]
          ? {
              uuid: filteredAccount[0].uuid,
              bankName: filteredAccount[0].alias,
              to: filteredAccount[0].alias,
              type: DefaultStrings.TYPE_BANK_ACCOUNT,
              currency: this.state.currencyType,
              id_account: filteredAccount[0].uuid,
            }
          : '',
        bankAccounts: filteredAccount.map((bank) => {
          return {
            label: bank.alias,
            value: {
              uuid: bank.uuid,
              bankName: bank.alias,
              to: bank.alias,
              type: DefaultStrings.TYPE_BANK_ACCOUNT,
              currency: this.state.currencyType,
              id_account: bank.uuid,
            },
          }
        }),
      },
      () => {
        this.props.showOrHideLoader(false)
      }
    )
  }

  // show contact info list
  onContactClick = () => {
    // open contact list page
    this.setState({ selectedOption: DefaultStrings.A_CONTACT })
    // Navigate to
    Navigator.navigate(NavKeys.CONTACT_LIST, {
      currency: this.state.currencyType,
    })
  }

  // update selected bank account
  onSelectBankAccount = (value) => {
    this.setState({ selectedValue: value.alias, selectedBank: value })
  }

  // Handle back button click
  onClickBack = () => {
    if (
      this.state.selectedOption === '' ||
      this.state.selectedOption === DefaultStrings.A_CONTACT
    ) {
      Navigator.goBack()
    }
    let selectedBank = this.state.selectedBank
    selectedBank.to = ''
    this.setState({
      selectedOption: '',
      selectedBank: selectedBank,
    })
  }

  // save selected bank and go to next screen
  onDoneClick = () => {
    if (
      this.state.selectedBank &&
      this.state.selectedBank.to &&
      this.state.selectedBank.to.length > 0
    ) {
      this.props.setSelectedBank(this.state.selectedBank)
      Navigator.navigate(NavKeys.SEND_ENTER_AMOUNT_DETAIL, {
        currencyType: this.state.currencyType,
      })
    } else {
      Alert.alert(I18n.t('ERROR'), I18n.t('PLEASE_SELECT_BANK'), [
        {
          text: I18n.t('CANCEL'),
          style: 'cancel',
        },
      ])
    }
  }
}

SendToOptionsScreen.propTypes = {
  getBankAccounts: PropTypes.func,
  setSelectedBank: PropTypes.func,
  showOrHideLoader: PropTypes.func,
  navigation: PropTypes.object.isRequired,
}

// Get State from redux store
export const mapStateToProps = (state) => ({})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBankAccounts: (successFn, failureFn) =>
    dispatch(UserActions.getBankAccounts(successFn, failureFn)),
  setSelectedBank: (bankData) => dispatch(UserActions.setSelectedBank(bankData)),
  showOrHideLoader: (status) => dispatch(CommonActions.showOrHideLoader(status)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendToOptionsScreen)

import React, { Component } from 'react'
import { SafeAreaView, View, Text, Alert, KeyboardAvoidingView, Keyboard } from 'react-native'
import styles from './AddEuroBankAccountScreenStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Line from 'App/Components/Line/Line'
import Button from 'App/Components/Button/Button'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showAlert, getUserFullName, getUserAddress } from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import NavKeys from 'App/Constants/NavKeys'
import BankTypes from '../../../Constants/BankTypes'
import UserType from '../../../Constants/UserType'

/**
 *  user can add their Euro Bank here
 */

export class AddEuroAccountScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ibanNumber: '',
      isValidIbanNumber: true,
      selectedType:
        this.props.onBoardingProfile.type_user === UserType.PERSONAL
          ? BankTypes.PERSONAL
          : BankTypes.BUSINESS,
      alais: '',
      isValidAlais: true,
      accHolderName: getUserFullName(this.props.onBoardingProfile),
      isValidAccHolderName: true,
      accEurName: '',
      isValidEurName: true,
      focusedInput: '',
    }
  }

  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  // callback for keyboard hide
  _keyboardDidHide = () => {
    const { focusedInput, ibanNumber } = this.state
    if (focusedInput === I18n.t('IBAN_NUMBER'))
      this.props.validateIBAN({ iban: ibanNumber.replace(/ /g, '') }, this.validateIBAN)
  }

  // remove the keyboard hide callback
  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
  }

  render() {
    // to access current state
    const {
      ibanNumber,
      isValidIbanNumber,
      selectedType,
      alais,
      isValidAlais,
      accHolderName,
      isValidAccHolderName,
      isValidEurName,
      accEurName,
    } = this.state
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    const { isFromOnBoarding } = this.props.navigation.state.params || {}
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          {/* Profile header component */}
          {isFromOnBoarding ? (
            <View>
              <ToolBar testID={'ToolBar'} />
              <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
            </View>
          ) : (
            <>
              <ProfileHeader
                fullName={getUserFullName(onBoardingProfile)}
                address={getUserAddress(onBoardingProfile)}
                profilePhoto={profilePhoto}
                dispatch={dispatch}
                icon={CommonIcons.bankAccount}
              />
            </>
          )}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headingStyle}>
              <Text testID={'titleText'} style={styles.titleText}>
                {I18n.t('ADD_NEW_BANK_ACCOUNT_TITLE')}
              </Text>
              <Button
                text={I18n.t('EURO_SEPA')}
                withBg={true}
                testID={'usaswift'}
                style={styles.headingButton}
                textStyle={styles.headingButtonText}
                onClick={() => {}}
              />
            </View>
            <Line styleProp={styles.titleLine} />
            <View style={styles.typeParentContainer}>
              {onBoardingProfile.type_user === UserType.PERSONAL && (
                <TouchableOpacity
                  onPress={this.onAccountTypeSelected.bind(this, 3)}
                  style={[
                    styles.typeContainer,
                    selectedType === 3 ? styles.selectedBg : styles.unSelectedBg,
                  ]}
                >
                  <Text
                    style={[
                      styles.accountTypeText,
                      selectedType === 3
                        ? styles.accountTypeSelectedText
                        : styles.accountTypeUnSelectedText,
                    ]}
                  >
                    {I18n.t('PERSONAL')}
                  </Text>
                </TouchableOpacity>
              )}
              {onBoardingProfile.type_user === UserType.BUSINESS && (
                <TouchableOpacity
                  onPress={this.onAccountTypeSelected.bind(this, 4)}
                  style={[
                    styles.typeContainer,
                    selectedType === 4 ? styles.selectedBg : styles.unSelectedBg,
                  ]}
                >
                  <Text
                    style={[
                      styles.accountTypeText,
                      selectedType === 4
                        ? styles.accountTypeSelectedText
                        : styles.accountTypeUnSelectedText,
                    ]}
                  >
                    {I18n.t('BUSINESS')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={[styles.benificiryContainer, styles.containerBottom]}>
              {this.renderInputFieldWithTitle(I18n.t('IBAN_NUMBER'), isValidIbanNumber, ibanNumber)}
              {this.renderInputFieldWithTitle(I18n.t('ALAIS_TEXT'), isValidAlais, alais)}
              {selectedType === 3 &&
                this.renderInputFieldWithTitle(
                  I18n.t('ACC_HOLDER_FULL_NAME'),
                  isValidAccHolderName,
                  accHolderName
                )}
              {selectedType === 4 &&
                this.renderInputFieldWithTitle(I18n.t('EUR_ACC_NAME'), isValidEurName, accEurName)}
            </View>
            <Button
              testID={'continue'}
              text={I18n.t('CONTINUE_BUTTON')}
              withShadow={true}
              withBg={true}
              onClick={() => this.submitInformation()}
            />
            <Button
              style={[styles.backButtonStyle, styles.bottomMargin]}
              text={I18n.t('BACK')}
              withBorder={true}
              onClick={this.onClickBack}
            />
          </ScrollView>
        </KeyboardAvoidingView>
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
   * bank account added confirmation dialog
   */
  showSuccessAlert = () => {
    Alert.alert(
      I18n.t('SUCCESS_HEADER'),
      I18n.t('BANK_ACCOUNT_ADDED_SUCCESSFULLY'),
      [
        {
          text: 'OK',
          onPress: this.callBankAccounts,
        },
      ], // I want this function to make Saga continue
      { cancelable: false }
    )
  }

  /**
   * get bank accounts API to update the Props
   */
  callBankAccounts = () => {
    const { onBankCallback } = this.props.navigation.state.params || {}
    if (onBankCallback) {
      this.props.navigation.state.params.onBankCallback()
      Navigator.goBack()
    } else this.props.getBankAccounts(this.getAccounts, showAlert)
  }

  /**
   * bank account success Callback
   */
  getAccounts = (list) => {
    const { isFromOnBoarding } = this.props.navigation.state.params || {}

    isFromOnBoarding ? Navigator.navigateAndReset(NavKeys.TAB) : Navigator.goBack()
  }

  /**
   * render the input fiels
   * @param {String} title input field title
   * @param {Boolean} validfield wether the user entered valid data
   * @param {String} value currently user enterd values
   */
  renderInputFieldWithTitle = (title, validfield, value) => {
    return (
      <View>
        <Text style={[styles.fieldTitleText, styles.fieldTitleMargin]}>{title}</Text>
        <TextInput
          testID={'alais'}
          returnKeyType="done"
          value={value}
          onFocus={() => this.setState({ focusedInput: title })}
          editable={title !== I18n.t('ACC_HOLDER_FULL_NAME')}
          style={[
            styles.inputTextStyle,
            validfield ? styles.textInputBorderNill : styles.textInputDangerBorder,
          ]}
          onChangeText={(text) => this.onChangeInputField(title, text)}
        />
      </View>
    )
  }

  /**
   * validate IBAN and get the valid Bank datas
   * @param {*} data valid iban response
   */
  validateIBAN = (data) => {
    this.setState({ alais: data.alias })
  }

  /**
   * user account type selection action
   * @param {String} selectedType user currently selected type
   */
  onAccountTypeSelected = (selectedType) => {
    this.setState({
      selectedType: selectedType,
    })
  }

  /**
   * common value change for all input fields
   * @param {String} title input field title
   * @param {String} text currently user enterd values
   */
  onChangeInputField = (title, text) => {
    switch (title) {
      case I18n.t('IBAN_NUMBER'):
        this.onChangeIbanNumber(text)
        break
      case I18n.t('ALAIS_TEXT'):
        this.onChangeAlais(text)
        break
      case I18n.t('ACC_HOLDER_FULL_NAME'):
        this.onChangeAccHolder(text)
        break
      case I18n.t('EUR_ACC_NAME'):
        this.onChangeEurAccHolder(text)
        break
    }
  }

  /**
   *
   * @param {String} ibanNumber - refers user enter input as an ibanNumber string
   *
   * It updates state object with ibanNumber
   */
  onChangeIbanNumber(ibanNumber) {
    const validIbanNumber = ibanNumber.length > 3
    this.setState({
      ibanNumber: ibanNumber,
      isValidIbanNumber: validIbanNumber,
    })
  }

  /**
   *
   * @param {String} alais - refers user enter input as an alais string
   *
   * It updates state object with alais
   */
  onChangeAlais(alais) {
    const validAlais = alais.length > 3
    this.setState({
      alais: alais,
      isValidAlais: validAlais,
    })
  }

  /**
   *
   * @param {String} accHolderName - refers user enter input as an accHolderName string
   *
   * It updates state object with accHolderName
   */
  onChangeAccHolder(accHolderName) {
    const validAccHolderName = accHolderName.length > 3
    this.setState({
      accHolderName: accHolderName,
      isValidAccHolderName: validAccHolderName,
    })
  }

  /**
   *
   * @param {String} accEurName - refers user enter input as an accHolderName string
   *
   * It updates state object with accHolderName
   */
  onChangeEurAccHolder(accEurName) {
    const validAccEurName = accEurName.length > 3
    this.setState({
      accEurName: accEurName,
      isValidEurName: validAccEurName,
    })
  }

  /**
   * submit Bank information to API
   */
  submitInformation = () => {
    const { ibanNumber, selectedType, alais, accHolderName, accEurName } = this.state

    if (ibanNumber.trim().length === 0) {
      this.setState({ isValidIbanNumber: false })
      return
    }
    if (alais.trim().length === 0) {
      this.setState({ isValidAlais: false })
      return
    }
    if (selectedType === 0) {
      showAlert(I18n.t('BANK_TYPE_ERROR'))
      return
    }
    if (selectedType === 3) {
      if (accHolderName.trim().length === 0) {
        this.setState({ isValidAccHolderName: false })
        return
      }
    } else {
      if (accEurName.trim().length === 0) {
        this.setState({ isValidEurName: false })
        return
      }
    }
    const params = this.ConstructParam()
    this.props.addBankAccount(
      (data) => {
        this.showSuccessAlert()
      },
      params,
      DefaultStrings.TYPE_EUR
    )
  }

  /**
   * construct the API params based on user input
   */
  ConstructParam = () => {
    // to access current state
    const { ibanNumber, selectedType, alais } = this.state

    const param = {
      type: selectedType,
      alias: alais,
      number: ibanNumber.trim(),
      fiat: DefaultStrings.TYPE_EUR,
    }
    return param
  }
}
AddEuroAccountScreen.propTypes = {
  validateIBAN: PropTypes.func,
  addBankAccount: PropTypes.func,
  getBankAccounts: PropTypes.func,
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  addBankAccount: (successFn, data, apiType) =>
    dispatch(UserActions.addBankAccount(successFn, data, apiType)),
  getBankAccounts: (successFn, failureFn) =>
    dispatch(UserActions.getBankAccounts(successFn, failureFn)),
  validateIBAN: (data, successFn) => dispatch(UserActions.validateIBAN(data, successFn)),
  dispatch: dispatch,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEuroAccountScreen)

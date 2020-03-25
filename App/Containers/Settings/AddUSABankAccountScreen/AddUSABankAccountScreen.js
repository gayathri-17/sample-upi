import React, { Component } from 'react'
import { SafeAreaView, View, Text, Alert, KeyboardAvoidingView } from 'react-native'
import styles from './AddUSABankAccountScreenStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Line from 'App/Components/Line/Line'
import Button from 'App/Components/Button/Button'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SignUpActions from 'App/Stores/SignUp/Actions'
import { showAlert, getUserFullName, getUserAddress } from 'App/Components/Utils/Functions'
import UserActions from 'App/Stores/User/Actions'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import NavKeys from 'App/Constants/NavKeys'

/**
 *  user can add their USA bank accout here
 */

export class AddUSAAccountScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      benificiryName: getUserFullName(this.props.onBoardingProfile),
      isValidBenificiryName: true,
      address: '',
      isValidAddress: true,
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      selectedType: 0,
      bankName: '',
      isValidBankName: true,
      alais: '',
      isValidAlais: true,
      accountNumber: '',
      isValidAccountNumber: true,
      achRouting: '',
      isValidAchRouting: true,
      wireRouting: '',
      isValidWireRouting: true,
      bankAddress: '',
      isValidBankAddress: true,
      bankCity: '',
      isValidBankCity: true,
      zipcode: '',
      isValidZipCode: true,
      bankState: '',
      isValidBankState: true,
      swiftBic: '',
      isValidswiftBic: true,
      benificiryZip: '',
      isValidBenificiryZip: true,
      bankCountry: '',
      isValidBankCountry: true,
      benificaryProvince: [],
      bankProvince: [],
      isBenificirtCountry: true,
    }
  }

  // Get country list from API
  componentDidMount() {
    this.props.getCountryList((data) => {
      this.updateCountry(data[0].value, 0)
    })
  }

  render() {
    // to access current state
    const {
      benificiryName,
      isValidBenificiryName,
      address,
      isValidAddress,
      selectedCountry,
      selectedCity,
      selectedState,
      selectedType,
      bankName,
      isValidBankName,
      alais,
      isValidAlais,
      accountNumber,
      isValidAccountNumber,
      achRouting,
      isValidAchRouting,
      wireRouting,
      isValidWireRouting,
      bankAddress,
      isValidBankAddress,
      bankCity,
      isValidBankCity,
      zipcode,
      isValidZipCode,
      bankState,
      swiftBic,
      isValidswiftBic,
      benificiryZip,
      isValidBenificiryZip,
      bankCountry,
      benificaryProvince,
      bankProvince,
    } = this.state

    // to access current props
    const { countryList, onBoardingProfile, profilePhoto, dispatch } = this.props
    const { isFromOnBoarding } = this.props.navigation.state.params || {}

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          {isFromOnBoarding ? (
            <View>
              <ToolBar testID={'ToolBar'} />
              <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
            </View>
          ) : (
            <>
              {/* Profile header component */}
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
                text={I18n.t('USA_SWIFT')}
                withBg={true}
                testID={'usaswift'}
                style={styles.headingButton}
                textStyle={styles.headingButtonText}
                onClick={() => {}}
              />
            </View>
            <Line styleProp={styles.titleLine} />
            <View style={styles.mainContainer}>
              <Text style={[styles.fieldTitleText, styles.containerTitle]}>
                {I18n.t('BENEFICIARY')}
              </Text>
              <View style={styles.benificiryContainer}>
                {this.renderInputFieldWithTitle(
                  I18n.t('BENEFICIARY_NAME'),
                  isValidBenificiryName,
                  benificiryName
                )}
                {this.renderInputFieldWithTitle(I18n.t('ADDRESS'), isValidAddress, address)}
                <Text style={[styles.fieldTitleText, styles.fieldTitleMargin]}>
                  {I18n.t('COUNTRY')}
                </Text>
                {/** country dropdown */}
                <RNPickerSelect
                  testID={'countryPicker'}
                  style={{
                    inputIOS: styles.countryDropDownInputStyle,
                    inputAndroid: styles.countryDropDownInputStyle,
                    iconContainer: styles.dropdownIconStyle,
                  }}
                  placeholder={{}}
                  onValueChange={(itemValue, index) => this.updateCountry(itemValue, index)}
                  value={selectedCountry}
                  items={countryList}
                  Icon={this.dropDownArrowView}
                />
                <View style={styles.dropDownContainer}>
                  {/* City input field  */}
                  <View style={styles.countryContainer}>
                    <Text style={[styles.fieldTitleText, styles.dropdownFieldTitleMargin]}>
                      {I18n.t('CITY')}
                    </Text>
                    <TextInput
                      testID={'cityText'}
                      returnKeyType="done"
                      value={selectedCity}
                      style={styles.cityInputTextStyle}
                      onChangeText={(text) => this.updateCity(text)}
                    />
                  </View>
                  {/** state  */}
                  <View style={styles.stateContainer}>
                    <Text style={[styles.fieldTitleText, styles.dropdownFieldTitleMargin]}>
                      {I18n.t('STATE')}
                    </Text>
                    <RNPickerSelect
                      testID={'statePicker'}
                      style={{
                        inputIOS: styles.stateDropDownInputStyle,
                        inputAndroid: styles.stateDropDownInputStyle,
                        iconContainer: styles.stateDropdownIconStyle,
                      }}
                      placeholder={{}}
                      onValueChange={(itemValue, index) => this.updateState(itemValue, index)}
                      value={selectedState}
                      items={benificaryProvince}
                      Icon={this.dropDownArrowView}
                    />
                  </View>
                </View>
                {this.renderInputFieldWithTitle(
                  I18n.t('BENEFICIARY_ZIP'),
                  isValidBenificiryZip,
                  benificiryZip
                )}
              </View>
              <Text style={[styles.fieldTitleText, styles.containerTitle]}>
                {I18n.t('BANK_ACCOUNT_INFORMATION')}
              </Text>
              <View style={styles.typeParentContainer}>
                <TouchableOpacity
                  onPress={this.onAccountTypeSelected.bind(this, 1)}
                  style={[
                    styles.typeContainer,
                    selectedType === 1 ? styles.selectedBg : styles.unSelectedBg,
                  ]}
                >
                  <Text
                    style={[
                      styles.accountTypeText,
                      selectedType === 1
                        ? styles.accountTypeSelectedText
                        : styles.accountTypeUnSelectedText,
                    ]}
                  >
                    {I18n.t('DOMESTIC')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.onAccountTypeSelected.bind(this, 2)}
                  style={[
                    styles.typeContainer,
                    selectedType === 2 ? styles.selectedBg : styles.unSelectedBg,
                  ]}
                >
                  <Text
                    style={[
                      styles.accountTypeText,
                      selectedType === 2
                        ? styles.accountTypeSelectedText
                        : styles.accountTypeUnSelectedText,
                    ]}
                  >
                    {I18n.t('INTERNATIONAL')}
                  </Text>
                </TouchableOpacity>
              </View>
              {selectedType !== '' && (
                <View style={[styles.benificiryContainer, styles.containerBottom]}>
                  {this.renderInputFieldWithTitle(I18n.t('BANK_NAME'), isValidBankName, bankName)}
                  {this.renderInputFieldWithTitle(I18n.t('ALAIS_TEXT'), isValidAlais, alais)}
                  {this.renderInputFieldWithTitle(
                    I18n.t('ACCOUNT_NUMBER'),
                    isValidAccountNumber,
                    accountNumber
                  )}
                  {selectedType === 2 &&
                    this.renderInputFieldWithTitle(
                      I18n.t('SWIFT_BIC_CODE'),
                      isValidswiftBic,
                      swiftBic
                    )}
                  {selectedType !== 2 &&
                    this.renderInputFieldWithTitle(
                      I18n.t('ROUTING_ACH_ABA'),
                      isValidAchRouting,
                      achRouting
                    )}
                  {selectedType !== 2 &&
                    this.renderInputFieldWithTitle(
                      I18n.t('ROUTING_WIRE_ABA'),
                      isValidWireRouting,
                      wireRouting
                    )}
                  {this.renderInputFieldWithTitle(
                    I18n.t('BANK_ADDRESS'),
                    isValidBankAddress,
                    bankAddress
                  )}
                  {this.renderInputFieldWithTitle(I18n.t('CITY'), isValidBankCity, bankCity)}
                  {/* {this.renderInputFieldWithTitle(
                    I18n.t('COUNTRY'),
                    isValidBankCountry,
                    bankCountry
                  )} */}
                  <Text style={[styles.fieldTitleText, styles.fieldTitleMargin]}>
                    {I18n.t('COUNTRY')}
                  </Text>
                  {/** country dropdown */}
                  <RNPickerSelect
                    testID={'countryPicker'}
                    style={{
                      inputIOS: styles.countryDropDownInputStyle,
                      inputAndroid: styles.countryDropDownInputStyle,
                      iconContainer: styles.dropdownIconStyle,
                    }}
                    placeholder={{}}
                    onValueChange={(itemValue, index) => this.updateBankCountry(itemValue, index)}
                    value={bankCountry}
                    items={countryList}
                    Icon={this.dropDownArrowView}
                  />
                  <View style={styles.dropDownContainer}>
                    {/* City input field  */}
                    <View style={styles.countryContainer}>
                      <Text style={[styles.fieldTitleText, styles.dropdownFieldTitleMargin]}>
                        {I18n.t('ZIP_CODE')}
                      </Text>
                      <TextInput
                        testID={'zipcode'}
                        returnKeyType="done"
                        value={zipcode}
                        style={[
                          styles.cityInputTextStyle,
                          isValidZipCode
                            ? styles.textInputBorderNill
                            : styles.textInputDangerBorder,
                        ]}
                        onChangeText={(text) => this.onChangeZipCode(text)}
                      />
                    </View>
                    {/** state  */}
                    {/* <View style={styles.stateContainer}>
                      <Text style={[styles.fieldTitleText, styles.dropdownFieldTitleMargin]}>
                        {I18n.t('STATE')}
                      </Text>
                      <View style={styles.dropDownStyle}>
                        <TextInput
                          testID={'bankState'}
                          returnKeyType="done"
                          value={bankState}
                          style={[
                            styles.stateDropDownInputStyle,
                            isValidBankState
                              ? styles.textInputBorderNill
                              : styles.textInputDangerBorder,
                          ]}
                          onChangeText={(text) => this.onChangeBankState(text)}
                        />
                      </View>
                    </View>
                  */}
                    <View style={styles.stateContainer}>
                      <Text style={[styles.fieldTitleText, styles.dropdownFieldTitleMargin]}>
                        {I18n.t('STATE')}
                      </Text>
                      <RNPickerSelect
                        testID={'statePicker'}
                        style={{
                          inputIOS: styles.stateDropDownInputStyle,
                          inputAndroid: styles.stateDropDownInputStyle,
                          iconContainer: styles.stateDropdownIconStyle,
                        }}
                        placeholder={{}}
                        onValueChange={(itemValue, index) => this.updateBankState(itemValue, index)}
                        value={bankState}
                        items={bankProvince}
                        Icon={this.dropDownArrowView}
                      />
                    </View>
                  </View>
                </View>
              )}
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
          editable={title !== I18n.t('BENEFICIARY_NAME')}
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
   * common value change for all input fields
   * @param {String} title input field title
   * @param {String} text currently user enterd values
   */
  onChangeInputField = (title, text) => {
    switch (title) {
      case I18n.t('BENEFICIARY_NAME'):
        this.onChangeBenificiryName(text)
        break
      case I18n.t('ADDRESS'):
        this.onChangeAddress(text)
        break
      case I18n.t('BANK_NAME'):
        this.onChangeBankName(text)
        break
      case I18n.t('ALAIS_TEXT'):
        this.onChangeAlais(text)
        break
      case I18n.t('ACCOUNT_NUMBER'):
        this.onChangeAccountNumber(text)
        break
      case I18n.t('ROUTING_ACH_ABA'):
        this.onChangeRoutingAch(text)
        break
      case I18n.t('ROUTING_WIRE_ABA'):
        this.onChangeRoutingWire(text)
        break
      case I18n.t('BANK_ADDRESS'):
        this.onChangeBankAddress(text)
        break
      case I18n.t('CITY'):
        this.onChangeBankCity(text)
        break
      case I18n.t('SWIFT_BIC_CODE'):
        this.onChangeSwiftBic(text)
        break
      case I18n.t('BENEFICIARY_ZIP'):
        this.onChangeBenificiryZip(text)
        break
      case I18n.t('COUNTRY'):
        this.onChangeBankCountry(text)
        break
    }
  }

  /**
   * submit Bank information to API
   */
  submitInformation = () => {
    const {
      benificiryName,
      address,
      selectedType,
      bankName,
      alais,
      accountNumber,
      achRouting,
      wireRouting,
      bankAddress,
      bankCity,
      bankCountry,
      zipcode,
      bankState,
      swiftBic,
    } = this.state
    if (benificiryName.trim().length === 0) {
      this.setState({ isValidBenificiryName: false })
      return
    }
    if (address.trim().length === 0) {
      this.setState({ isValidAddress: false })
      return
    }

    if (selectedType === 0) {
      showAlert(I18n.t('BANK_TYPE_ERROR'))
      return
    }
    if (bankName.trim().length === 0) {
      this.setState({ isValidBankName: false })
      return
    }
    if (alais.trim().length === 0) {
      this.setState({ isValidAlais: false })
      return
    }
    if (accountNumber.trim().length === 0) {
      this.setState({ isValidAccountNumber: false })
      return
    }

    if (selectedType === 1) {
      if (achRouting.trim().length === 0) {
        this.setState({ isValidAchRouting: false })
        return
      }
      if (wireRouting.trim().length === 0) {
        this.setState({ isValidWireRouting: false })
        return
      }
    } else {
      if (swiftBic.trim().length === 0) {
        this.setState({ isValidswiftBic: false })
        return
      }
    }
    if (bankAddress.trim().length === 0) {
      this.setState({ isValidBankAddress: false })
      return
    }
    if (bankCity.trim().length === 0) {
      this.setState({ isValidBankCity: false })
      return
    }
    if (bankCountry.trim().length === 0) {
      this.setState({ isValidBankCountry: false })
      return
    }
    if (zipcode.trim().length === 0) {
      this.setState({ isValidZipCode: false })
      return
    }
    if (bankState.trim().length === 0) {
      this.setState({ isValidBankState: false })
      return
    }
    const params = this.ConstructParam()
    this.props.addBankAccount(
      (data) => {
        this.showSuccessAlert()
      },
      params,
      DefaultStrings.TYPE_USD
    )
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
   * construct the API params based on user input
   */
  ConstructParam = () => {
    // to access current state
    const {
      benificiryName,
      address,
      selectedCity,
      selectedState,
      selectedType,
      bankName,
      alais,
      accountNumber,
      achRouting,
      wireRouting,
      bankAddress,
      bankCity,
      zipcode,
      bankState,
      swiftBic,
      benificiryZip,
      bankCountry,
    } = this.state

    // to access current props
    const { provinceList } = this.props

    const param = {
      type: selectedType,
      alias: alais,
      number: accountNumber,
      bankName: bankName,
      bankAddress: bankAddress,
      bankCity: bankCity,
      bankCountry: bankCountry,
      bankState: bankState,
      bankZipCode: zipcode,
      routingAbaElectronic: selectedType === 1 ? wireRouting : '',
      routing: selectedType === 1 ? achRouting : '',
      swif_bic: selectedType === 2 ? swiftBic : '',
      beneficiaryName: benificiryName,
      beneficiaryAddress: address,
      beneficiaryCity: selectedCity,
      beneficiaryState: selectedState.length === 0 ? provinceList[0] : selectedState,
      beneficiaryZip: benificiryZip,
      fiat: DefaultStrings.TYPE_USD,
    }
    return param
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
   * Dropdown view function
   * @returns {DropDownArrow} returns Drop down arrow view
   */
  dropDownArrowView = () => {
    return (
      <DropDownArrow
        width={styles.dropDownImageStyle.width}
        height={styles.dropDownImageStyle.height}
      />
    )
  }

  /**
   *
   * @param {String} accountNumber - refers user enter input as an accountNumber string
   *
   * It updates state object with accountNumber
   */
  onChangeAccountNumber(accountNumber) {
    const validAccountNumber = accountNumber.length > 3
    this.setState({
      accountNumber: accountNumber,
      isValidAccountNumber: validAccountNumber,
    })
  }

  /**
   *
   * @param {String} country - refers user enter input as an country string
   *
   * It updates state object with country
   */
  onChangeBankCountry(country) {
    const validCountry = country.length > 3
    this.setState({
      bankCountry: country,
      isValidBankCountry: validCountry,
    })
  }

  /**
   *
   * @param {String} bankState - refers user enter input as an bankState string
   *
   * It updates state object with bankState
   */
  onChangeBankState(bankState) {
    const validbankState = bankState.length > 3
    this.setState({
      bankState: bankState,
      isValidBankState: validbankState,
    })
  }

  /**
   *
   * @param {String} swiftBic - refers user enter input as an swiftBic string
   *
   * It updates state object with swiftBic
   */
  onChangeSwiftBic(swiftBic) {
    const validswiftBic = swiftBic.length > 3
    this.setState({
      swiftBic: swiftBic,
      isValidswiftBic: validswiftBic,
    })
  }

  /**
   *
   * @param {String} zipCode - refers user enter input as an zipCode string
   *
   * It updates state object with zipCode
   */
  onChangeBenificiryZip(zipCode) {
    const validZipCode = zipCode.length > 3
    this.setState({
      benificiryZip: zipCode,
      isValidBenificiryZip: validZipCode,
    })
  }

  /**
   *
   * @param {String} zipcode - refers user enter input as an zipcode string
   *
   * It updates state object with zipcode
   */
  onChangeZipCode(zipcode) {
    const validzipcode = zipcode.length > 3
    this.setState({
      zipcode: zipcode,
      isValidZipCode: validzipcode,
    })
  }

  /**
   *
   * @param {String} bankCity - refers user enter input as an bankCity string
   *
   * It updates state object with bankCity
   */
  onChangeBankCity(bankCity) {
    const validBankCity = bankCity.length > 3
    this.setState({
      bankCity: bankCity,
      isValidBankCity: validBankCity,
    })
  }

  /**
   *
   * @param {String} bankAddress - refers user enter input as an bankAddress string
   *
   * It updates state object with bankAddress
   */
  onChangeBankAddress(bankAddress) {
    const validBankAddress = bankAddress.length > 3
    this.setState({
      bankAddress: bankAddress,
      isValidBankAddress: validBankAddress,
    })
  }

  /**
   *
   * @param {String} achRouting - refers user enter input as an achRouting string
   *
   * It updates state object with achRouting
   */
  onChangeRoutingAch(achRouting) {
    const validAchRouting = achRouting.length > 3
    this.setState({
      achRouting: achRouting,
      isValidAchRouting: validAchRouting,
    })
  }

  /**
   *
   * @param {String} wireRouting - refers user enter input as an wireRouting string
   *
   * It updates state object with wireRouting
   */
  onChangeRoutingWire(wireRouting) {
    const validWireRouting = wireRouting.length > 3
    this.setState({
      wireRouting: wireRouting,
      isValidWireRouting: validWireRouting,
    })
  }

  /**
   *
   * @param {String} benificiryName - refers user enter input as an benificiryName string
   *
   * It updates state object with benificiryName
   */
  onChangeBenificiryName(benificiryName) {
    const validBenificiryName = benificiryName.length > 3
    this.setState({
      benificiryName: benificiryName,
      isValidBenificiryName: validBenificiryName,
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
   * @param {String} bankName - refers user enter input as an bakName string
   *
   * It updates state object with bakName
   */
  onChangeBankName(bankName) {
    const validBankName = bankName.length > 3
    this.setState({
      bankName: bankName,
      isValidBankName: validBankName,
    })
  }

  /**
   *
   * @param {String} address - refers user enter input as an address string
   *
   * It updates state object with address
   */
  onChangeAddress(address) {
    const validAddress = address.length > 3
    this.setState({
      address: address,
      isValidAddress: validAddress,
    })
  }

  /**
   * Change country function
   * @param {String} country - refers Country based on user selected in dropdown
   * @param {Int} intex - selected index
   * It updates country state object with selected by user
   */
  updateCountry(country, index) {
    this.setState({
      selectedCountry: country,
    })
    this.props.getProvinceList(country, (provienceList) => {
      this.setState({
        benificaryProvince: provienceList,
        bankProvince: this.state.isBenificirtCountry ? provienceList : this.state.bankProvince,
        isBenificirtCountry: false,
      })
    })
  }
  /**
   * Change bank country function
   * @param {String} country - refers Country based on user selected in dropdown
   * @param {Int} intex - selected index
   * It updates country state object with selected by user
   */
  updateBankCountry(country, index) {
    this.setState({
      bankCountry: country,
    })
    this.props.getProvinceList(country, (provienceList) => {
      this.setState({ bankProvince: provienceList })
    })
  }

  /**
   * Change state function
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateState(state, index) {
    this.setState({
      selectedState: state,
    })
  }

  /**
   * Change bank state function
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateBankState(state, index) {
    this.setState({
      bankState: state,
    })
  }

  /**
   * Change city function
   * @param {String} city - refers city based on user selected in dropdown
   * It updates city object with selected by user
   */
  updateCity(city, index) {
    this.setState({
      selectedCity: city,
    })
  }
}
AddUSAAccountScreen.propTypes = {
  getCountryList: PropTypes.func,
  getProvinceList: PropTypes.func,
  addBankAccount: PropTypes.func,
  countryList: PropTypes.array,
  provinceList: PropTypes.array,
  getBankAccounts: PropTypes.func,
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  countryList: state.signUp.countryList,
  provinceList: state.signUp.provinceList,
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getCountryList: (successFn) => dispatch(SignUpActions.getCountryList(successFn)),
  getProvinceList: (counrtryIso, successFn) =>
    dispatch(SignUpActions.getProvinceList(counrtryIso, successFn)),
  addBankAccount: (successFn, data, type) =>
    dispatch(UserActions.addBankAccount(successFn, data, type)),
  getBankAccounts: (successFn, failureFn) =>
    dispatch(UserActions.getBankAccounts(successFn, failureFn)),
  dispatch: dispatch,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUSAAccountScreen)

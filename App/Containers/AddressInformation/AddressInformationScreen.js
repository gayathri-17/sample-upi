import React from 'react'
import styles from './AddressInformationScreenStyle'
import { View, TouchableOpacity, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import Button from 'App/Components/Button/Button'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import Dropdown from 'App/Components/DropDown'
import SignUpActions from 'App/Stores/SignUp/Actions'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'

/*
 * User can give their Residential Information here
 */
export class AddressInformationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addressLineOne: '',
      addressLineTwo: '',
      selectedCountry: '',
      selectedState: '',
      selectedCountryValue: '',
      selectedStateValue: '',
      city: '',
      zipcode: '',
      validZipCode: true,
      isValidFirstAddressLine: true,
      isValidCity: true,
      countryModalvisible: false,
      stateModalVisible: false,
    }
  }

  // Get country list from API
  componentDidMount() {
    this.props.getCountryList(() => {})
  }

  render() {
    // To access current component state
    const {
      addressLineOne,
      addressLineTwo,
      isValidFirstAddressLine,
      city,
      zipcode,
      validZipCode,
      isValidCity,
      selectedCountryValue,
      selectedStateValue,
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <ToolBar testID={'ToolBar'} />
            <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
            <Header
              testID={'Header'}
              titleText={I18n.t('ADDRESS_INFORMATION')}
              description={I18n.t('ADDRESS_INFO_DESC')}
            />
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <Text style={styles.fieldTitle}>{I18n.t('ADDRESSLINE_ONE')}</Text>
              <TextInput
                testID={'addressLineOne'}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.addressTwo.focus()
                }}
                value={addressLineOne}
                style={[
                  styles.inputTextStyle,
                  isValidFirstAddressLine
                    ? styles.textInputBorderNill
                    : styles.textInputDangerBorder,
                ]}
                onChangeText={(text) => this.onChangeAddressOne(text)}
              />
              <Text style={styles.fieldTitle}>{I18n.t('ADDRESSLINE_TWO')}</Text>
              <TextInput
                testID={'addressLineTwo'}
                returnKeyType="done"
                ref={(input) => {
                  this.addressTwo = input
                }}
                value={addressLineTwo}
                style={styles.inputTextStyle}
                onChangeText={(text) => this.onChangeAddressTwo(text)}
              />
              <View style={styles.dropDownContainer}>
                {/** country dropdown */}
                <View style={styles.countryContainer}>
                  <Text style={styles.fieldTitle}>{I18n.t('COUNTRY')}</Text>
                  <View style={styles.dropDownStyleMargin}>
                    <TouchableOpacity
                      style={styles.countryDropDownInputStyle}
                      onPress={() => this.setState({ countryModalvisible: true })}
                    >
                      <Text numberOfLines={1} style={styles.dropDownTextStyle}>
                        {selectedCountryValue}
                      </Text>
                      <Dropdown
                        testID={'countryPicker'}
                        placeholderText={'Select country'}
                        visible={this.state.countryModalvisible}
                        onSelect={this.updateCountry}
                        onCancel={() => this.setState({ countryModalvisible: false })}
                        options={this.props.countryList}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/** Province/State Picker */}
                <View style={styles.stateContainer}>
                  <Text style={styles.stateFieldTitle}>{I18n.t('STATE')}</Text>
                  <View style={styles.dropDownStyle}>
                    <TouchableOpacity
                      style={styles.stateDropDownInputStyle}
                      onPress={() => this.setState({ stateModalVisible: true })}
                    >
                      <Text numberOfLines={1} style={styles.dropDownTextStyle}>
                        {selectedStateValue}
                      </Text>
                      <Dropdown
                        testID={'countryPicker'}
                        placeholderText={'Select country'}
                        visible={this.state.stateModalVisible}
                        onSelect={this.updateProvince}
                        onCancel={() => this.setState({ stateModalVisible: false })}
                        options={this.props.provinceList}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.dropDownContainer}>
                {/* City input field  */}
                <View style={styles.countryContainer}>
                  <Text style={styles.fieldTitle}>{I18n.t('CITY')}</Text>
                  <TextInput
                    testID={'cityText'}
                    returnKeyType="done"
                    value={city}
                    style={[
                      styles.cityInputTextStyle,
                      isValidCity ? styles.textInputBorderNill : styles.textInputDangerBorder,
                    ]}
                    onChangeText={(text) => this.updateCity(text)}
                  />
                </View>
                {/** Zipcode  */}
                <View style={styles.stateContainer}>
                  <Text style={styles.stateFieldTitle}>{I18n.t('ZIP_CODE')}</Text>
                  <TextInput
                    testID={'zipCode'}
                    returnKeyType="done"
                    value={zipcode}
                    keyboardType={'numeric'}
                    style={[
                      styles.zipCodeTextStyle,
                      validZipCode ? styles.textInputBorderNill : styles.textInputDangerBorder,
                    ]}
                    onChangeText={(text) => this.onChangeZipCode(text)}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  testID={'continue'}
                  text={I18n.t('CONTINUE_BUTTON')}
                  withShadow={true}
                  withBg={true}
                  onClick={() => this.submitInformation()}
                />
                <TouchableOpacity
                  testID={'backButton'}
                  style={styles.backButtonContainer}
                  onPress={() => this.onBackClicked()}
                >
                  <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
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
   * @param {String} addressOne - refers user enter input as an addressLineOne string
   *
   * It updates state object with addressLineOne
   */
  onChangeAddressOne(addressOne) {
    const validAddressLineOne = addressOne.trim().length > 2
    this.setState({
      addressLineOne: addressOne,
      isValidFirstAddressLine: validAddressLineOne,
    })
  }

  /**
   *
   * @param {String} addressTwo - refers user enter input as an addressLineTwo string
   *
   * It updates state object with addressLineTwo
   */
  onChangeAddressTwo(addressTwo) {
    this.setState({
      addressLineTwo: addressTwo,
    })
  }

  /**
   *
   * @param {String} zipCode - refers user enter input as an ZipCode string
   *
   * It updates state object with ZipCode
   */
  onChangeZipCode(zipCode) {
    const isValidZipCode = zipCode.trim().length > 2
    this.setState({
      zipcode: zipCode,
      validZipCode: isValidZipCode,
    })
  }

  /**
   *
   * @param {String} country - refers Country based on user selected in dropdown
   * It updates country state object with selected by user
   */
  updateCountry = (country) => {
    this.setState({
      selectedCountry: country.value,
      selectedCountryValue: country.label,
      countryModalvisible: false,
    })
    this.props.getProvinceList(country.value, () => {})
  }

  /**
   *
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateProvince = (state) => {
    this.setState({
      selectedState: state.value,
      selectedStateValue: state.label,
      stateModalVisible: false,
    })
  }

  /**
   *
   * @param {String} city - name of the city which enters by user
   */
  updateCity(city) {
    const isValidCity = city.trim().length > 2
    this.setState({
      city: city,
      isValidCity: isValidCity,
    })
  }

  // check all Inputs and navigate to professional information screen
  submitInformation = () => {
    const isValidFirstAddressLine = this.state.addressLineOne.trim().length > 2
    const isValidZipCode = this.state.zipcode.trim().length > 2
    const isValidCity = this.state.city.trim().length > 2

    if (isValidFirstAddressLine && isValidZipCode && isValidCity) {
      const profileData = {
        ...this.props.onBoardingProfile,
        address: this.state.addressLineOne.trim() + ', ' + this.state.addressLineTwo.trim(),
        country: this.state.selectedCountry,
        state: this.state.selectedState,
        city: this.state.city.trim(),
        zip_code: this.state.zipcode,
      }
      this.props.setOnBoardingProfile(profileData)
      Navigator.navigate(NavKeys.PROFESSIONAL_INFORMATION)
    } else {
      this.setState({
        isValidFirstAddressLine: isValidFirstAddressLine,
        validZipCode: isValidZipCode,
        isValidCity: isValidCity,
      })
    }
  }

  // navigate to the previous page
  onBackClicked = () => {
    Navigator.goBack()
  }
}

AddressInformationScreen.propTypes = {
  getCountryList: PropTypes.func,
  getProvinceList: PropTypes.func,
  countryList: PropTypes.array,
  provinceList: PropTypes.array,
  onBoardingProfile: PropTypes.object,
  setOnBoardingProfile: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  countryList: state.signUp.countryList,
  provinceList: state.signUp.provinceList,
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getCountryList: (successFn) => dispatch(SignUpActions.getCountryList(successFn)),
  getProvinceList: (counrtryIso, successFn) =>
    dispatch(SignUpActions.getProvinceList(counrtryIso, successFn)),
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressInformationScreen)

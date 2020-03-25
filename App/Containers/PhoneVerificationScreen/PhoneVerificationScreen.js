import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import styles from './PhoneVerificationScreenStyle'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import CircleChecked from 'App/Assets/Images/Svg/CircleChecked'
import Button from 'App/Components/Button/Button'
import DropDownArrow from 'App/Assets/Images/Svg/DropDownArrow'
import Navigator from 'App/Services/NavigationService'
import Dropdown from 'App/Components/DropDown'
import I18n from 'App/Localization/I18n'

/**
 *  Phone Verification screen to get user phone number.
 */

export class PhoneVerificationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: props.countryList.map((country) => {
        return {
          label: country.label + ' (+' + country.phonecode + ')',
          value: country.name,
        }
      }),
      phoneNumber: '',

      extension:
        '+' + props.countryList.find((x) => x.value === props.onBoardingProfile.country).phonecode,
      isValidNumber: false,
      pickerSelectedValue: props.countryList.find(
        (x) => x.value === props.onBoardingProfile.country
      ).name,
      pickerSelectedShowValue:
        props.countryList.find((x) => x.value === props.onBoardingProfile.country).label +
        ' (+' +
        props.countryList.find((x) => x.value === props.onBoardingProfile.country).phonecode +
        ')',
      countryModalvisible: false,
    }
  }

  render() {
    const {
      isValidNumber,
      phoneNumber,
      countries,
      countryModalvisible,
      pickerSelectedShowValue,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <ToolBar testID={'Toolbar'} />
            <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
            <Header
              testID={'Header'}
              titleText={I18n.t('PHONE_VERIFICATION')}
              description={I18n.t('PLEASE_ENTER_PHONE_NUMNER')}
            />
            <View style={styles.mainViewStyle}>
              <Text style={styles.smallTextStyle}>{I18n.t('COUNTRY')}</Text>
              {/** Country picker */}
              <TouchableOpacity
                style={styles.pickerStyle}
                onPress={() => this.setState({ countryModalvisible: true })}
              >
                <Text numberOfLines={1} style={styles.dropDownTextStyle}>
                  {pickerSelectedShowValue}
                </Text>
                <Dropdown
                  testID={'countryPicker'}
                  placeholderText={'Select country'}
                  visible={countryModalvisible}
                  onSelect={this.updateExtension}
                  onCancel={() => this.setState({ countryModalvisible: false })}
                  options={countries}
                />
              </TouchableOpacity>
              <Text style={[styles.smallTextStyle, styles.viewMargin]}>
                {I18n.t('PHONE_NUMBER')}
              </Text>
              {/** Phone number input view */}
              <View style={styles.numberDetailContainerStyle}>
                <Text style={styles.numberTextStyle}>{this.state.extension}</Text>
                <View style={styles.numberDetailStyle}>
                  <TextInput
                    testID={'PhoneNumberInput'}
                    returnKeyType="done"
                    keyboardType="numeric"
                    style={[styles.numberTextStyle, styles.inputHeight, styles.textInputBorderNill]}
                    value={phoneNumber}
                    onChangeText={(text) => this.onChangePhoneNumber(text)}
                  />
                </View>
                {/** Validation here to show tick view */}
                {isValidNumber ? (
                  <CircleChecked
                    testID="Tick"
                    width={styles.tickImageStyle.width}
                    height={styles.tickImageStyle.height}
                  />
                ) : (
                  <View width={styles.tickImageStyle.width} height={styles.tickImageStyle.height} />
                )}
              </View>
              {/** Continue button container */}
              <View style={styles.continueBtnContainer}>
                <Button
                  testID={'Continue'}
                  text={I18n.t('CONTINUE_BUTTON')}
                  withShadow={true}
                  withBg={true}
                  onClick={() => this.submitInformation()}
                />
                <TouchableOpacity
                  testID={'BackButton'}
                  onPress={() => Navigator.goBack()}
                  style={styles.backButtonContainer}
                >
                  <Text style={styles.backTextStyle}>{I18n.t('BACK')}</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    return <DropDownArrow width={styles.dropDownStyle.width} height={styles.dropDownStyle.height} />
  }

  /**
   * Change phone number function
   * @param {String} phoneNumber - refers user enter input as an phone number string
   * It updates phone number state object with phone number
   */
  onChangePhoneNumber(phoneNumber) {
    this.setState({ phoneNumber: phoneNumber })
    if (phoneNumber.length > 6) this.setState({ isValidNumber: true })
    else this.setState({ isValidNumber: false })
  }

  /**
   * Change extension function
   * @param {String} extension - refers extension based on country selected in dropdown
   * It updates extension state object with selected extension
   */
  updateExtension = (country) => {
    this.setState({
      pickerSelectedValue: country.value,
      pickerSelectedShowValue: country.label,
      extension: '+' + this.props.countryList.find((x) => x.name === country.value).phonecode,
      countryModalvisible: false,
    })
  }

  /**
   * submit user information if phone number is valid
   * It updates user information in the remote server by hitting api.
   */
  submitInformation() {
    const { phoneNumber, extension, pickerSelectedValue } = this.state
    if (phoneNumber.length > 6) {
      const profileData = {
        ...this.props.onBoardingProfile,
        phonenumber: phoneNumber,
        phone: phoneNumber,
        phonecode: extension,
        countryCode: this.props.countryList.find((x) => x.name === pickerSelectedValue).value,
      }

      this.props.setOnBoardingProfile(profileData)
      this.props.updateUserInformation(profileData)
    } else {
      this.setState({ isValidNumber: false })
    }
  }
}

PhoneVerificationScreen.propTypes = {
  updateUserInformation: PropTypes.func,
  countryList: PropTypes.array,
  onBoardingProfile: PropTypes.object,
  setOnBoardingProfile: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  isLoading: state.onBoarding.userInfoRequestIsLoading,
  countryList: state.signUp.countryList,
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  updateUserInformation: (userData) => dispatch(UserActions.updateUserInformation(userData)),
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneVerificationScreen)

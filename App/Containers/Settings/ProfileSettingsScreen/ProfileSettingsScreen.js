import React from 'react'
import styles from './ProfileSettingsScreenStyle'
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Line from 'App/Components/Line/Line'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import ProfileBasicInfo from 'App/Components/ProfileBasicInfo/ProfileBasicInfo'
import ProfileAditionalInfo from 'App/Components/ProfileAditionalInfo/ProfileAditionalInfo'
import ProfileBusinessInfo from 'App/Components/ProfileBusinessInfo/ProfileBusinessInfo'
import {
  getUserFullName,
  getUserAddress,
  getValueByAttribute,
  showValidatonAlert,
  openEmail,
} from 'App/Components/Utils/Functions'
import DefaultStrings from 'App/Constants/DefaultStrings'
import SignUpActions from 'App/Stores/SignUp/Actions'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'

/**
 * Profile Settings Screen  user can view view profile info, address, business and additional info
 */
export class ProfileSettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTire: 1,
      selectedCountry: '',
      selectedProvince: '',
    }
  }

  componentDidMount() {
    let profile = this.props.onBoardingProfile
    let iso = getValueByAttribute(profile, 'country')
    let province = getValueByAttribute(profile, 'state')
    this.getSelectedCountry(iso)
    this.getSelectedProvince(iso, province)
  }

  render() {
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    const { selectedTire } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          {/* Profile header component */}
          <ProfileHeader
            testID={'profileHeader'}
            fullName={getUserFullName(onBoardingProfile)}
            address={getUserAddress(onBoardingProfile)}
            profilePhoto={profilePhoto}
            dispatch={dispatch}
            icon={CommonIcons.profile}
          />

          {/* Tire selection view */}
          <View style={styles.tireContainer}>
            <View style={styles.tireView}>
              {selectedTire !== 3 && <Text style={styles.tireText}>{I18n.t('TIRE')}</Text>}
              <TouchableOpacity
                testID={'tireOne'}
                style={[styles.tireCountView, selectedTire === 1 && styles.tireCountSelected]}
                onPress={() => this.onTireSelection(1)}
              >
                <Text style={styles.countText}>{'1'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={'tireTwo'}
                style={[styles.tireCountView, selectedTire === 2 && styles.tireCountSelected]}
                onPress={() => this.onTireSelection(2)}
              >
                <Text style={styles.countText}>{'2'}</Text>
              </TouchableOpacity>
              {onBoardingProfile.type_user === 2 && (
                <TouchableOpacity
                  testID={'tireThree'}
                  style={[styles.tireCountView, selectedTire === 3 && styles.tireCountSelected]}
                  onPress={() => this.onTireSelection(3)}
                >
                  <Text style={styles.countText}>{'3'}</Text>
                </TouchableOpacity>
              )}

              {this.renderSelectedTireName()}
            </View>
            <Line styleProp={styles.lineStyle} />
          </View>
          {this.renderTireView()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  renderTireView() {
    const { selectedTire, selectedCountry, selectedProvince } = this.state
    switch (selectedTire) {
      case 1:
        return (
          <ProfileBasicInfo
            onBoardingProfile={this.props.onBoardingProfile}
            country={selectedCountry}
            province={selectedProvince}
          />
        )
      case 2:
        return (
          <ProfileAditionalInfo
            onBoardingProfile={this.props.onBoardingProfile}
            onClick={(isChanged, dateOfBirth, occupation, profession) => {
              if (isChanged) this.onSaveChanges(dateOfBirth, occupation, profession)
              else {
                openEmail(
                  DefaultStrings.SUPPORT_EMAIL,
                  I18n.t('PROFILE_CHANGE_MAIL_SUBJECT') + this.props.onBoardingProfile.email,
                  I18n.t('PROFILE_CHANGE_DESCRIPTION_1'),
                  I18n.t('PROFILE_CHANGE_DESCRIPTION_2')
                )
              }
            }}
          />
        )
      case 3:
        return (
          <ProfileBusinessInfo
            onBoardingProfile={this.props.onBoardingProfile}
            country={selectedCountry}
            province={selectedProvince}
          />
        )
    }
  }
  renderSelectedTireName() {
    const { selectedTire } = this.state
    let tireName = ''
    switch (selectedTire) {
      case 1:
        tireName = I18n.t('BASIC_INFO')
        break
      case 2:
        tireName = I18n.t('ADITIONAL_INFO')
        break
      case 3:
        tireName = I18n.t('BUSINESS_INFO')
        break
    }
    return <Text style={styles.tireText}>{tireName}</Text>
  }
  /**
   * get country name based on selected iso3 code from API
   * @param {string} iso selected country iso3 code
   */
  getSelectedCountry(iso) {
    // get Country list from API
    this.props.getCountryList((data) => {
      let country = this.getValueFromArray(data, iso)
      if (country.length) {
        this.setState({
          selectedCountry: country[0].label,
        })
      }
    })
  }

  /**
   * get Province name based on selected province code from API
   * @param {String} iso selected country iso3 code
   * @param {String} provinceCode selected province code
   */
  getSelectedProvince(iso, provinceCode) {
    // get Province
    this.props.getProvinceList(iso, (data) => {
      let province = this.getValueFromArray(data, provinceCode)
      if (province.length) {
        this.setState({
          selectedProvince: province[0].label,
        })
      }
    })
  }

  /**
   * get selected value object from array
   * @param {Array} data array of data
   * @param {string} value value to find object
   * @returns {Array} matched objects
   */
  getValueFromArray(data, value) {
    let matchedObject = data.filter((result) => {
      if (result.value === value) {
        return result
      }
    })
    return matchedObject
  }
  /**
   * Show user information based on tire selection
   * @param {Number} selectedTire selected tire value
   */
  onTireSelection(selectedTire) {
    this.setState({ selectedTire })
  }

  /**
   * Change country function
   * @param {String} country - refers Country based on user selected in dropdown
   * @param {Int} intex - selected index
   * It updates country state object with selected by user
   */
  updateCountry(country) {
    this.setState({
      selectedCountry: country[0].label,
    })
  }

  /**
   *
   * @param {String} state - refers State based on user selected in dropdown
   * It updates state object with selected by user
   */
  updateProvince(state) {
    this.setState({
      selectedState: state,
    })
  }
  onSaveChanges(dob, occupation, profession) {
    const { onBoardingProfile } = this.props

    const profileData = {
      ...onBoardingProfile,
      dob: dob,
      occupation: occupation,
      profession: profession,
      firstname: onBoardingProfile.name,
      lastname: onBoardingProfile.lastName,
      gender: 'Male', // TODO need to change when the data form API
      documentType: onBoardingProfile.tdocument,
      documentNumber: onBoardingProfile.ndocument,
      userType: onBoardingProfile.type_user,
      phonenumber: onBoardingProfile.phone,
      isUpdate: true,
    }
    this.props.setOnBoardingProfile(profileData)
    this.props.updateUserInformation(profileData, (message) => {
      this.setState({ selectedTire: this.state.selectedTire })
      showValidatonAlert(message)
    })
  }
}

ProfileSettingsScreen.propTypes = {
  onBoardingProfile: PropTypes.object,
  getCountryList: PropTypes.func,
  getProvinceList: PropTypes.func,
  countryList: PropTypes.array,
  provinceList: PropTypes.array,
  setOnBoardingProfile: PropTypes.func,
  updateUserInformation: PropTypes.func,
  profilePhoto: PropTypes.string,
  dispatch: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
  countryList: state.signUp.countryList,
  provinceList: state.signUp.provinceList,
  profilePhoto: state.user.profilePhoto,
})
// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getCountryList: (successFn) => dispatch(SignUpActions.getCountryList(successFn)),
  getProvinceList: (counrtryIso, successFn) =>
    dispatch(SignUpActions.getProvinceList(counrtryIso, successFn)),
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
  updateUserInformation: (userData, successFn) =>
    dispatch(UserActions.updateUserInformation(userData, successFn)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettingsScreen)

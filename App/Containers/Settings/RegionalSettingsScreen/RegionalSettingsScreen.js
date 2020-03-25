import React from 'react'
import styles from './RegionalSettingsScreenStyle'
import { SafeAreaView, View, Text } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Line from 'App/Components/Line/Line'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import Button from 'App/Components/Button/Button'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import Currencies from 'App/Assets/Images/Svg/Currencies'
import { getUserFullName, getUserAddress, transactionAlert } from 'App/Components/Utils/Functions'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Navigator from 'App/Services/NavigationService'
import RegionalPicker from 'App/Components/RegionalPicker/RegionalPicker'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'

/**
 * Regional Settings Screen  user can view view and edit Regional info and default currency
 */
export class RegionalSettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    const { language, defaultCurrency } = this.props
    this.state = {
      languages: [
        { label: I18n.t('ENGLISH'), value: DefaultStrings.ENG },
        { label: I18n.t('SPANISH'), value: DefaultStrings.SPA },
        { label: I18n.t('ESTONIAN'), value: DefaultStrings.EST },
      ],
      currency: [
        { label: I18n.t('TYPE_USD'), value: CurrencySeperatorType.USD },
        { label: I18n.t('TYPE_EURO'), value: CurrencySeperatorType.EURO },
      ],
      selectedLanguage: language,
      selectedCurrency: defaultCurrency,
      selectedFlag: CommonIcons.USFlag,
      selectedCurrencyIcon: Currencies.USD,
    }
  }
  componentDidMount() {
    const { language, defaultCurrency } = this.props
    this.onChangeLanguage(language)
    this.onChangeCurrency(defaultCurrency)
  }

  render() {
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    const {
      languages,
      currency,
      selectedLanguage,
      selectedCurrency,
      selectedFlag,
      selectedCurrencyIcon,
    } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/* Profile header component */}
        <ProfileHeader
          testID={'profileHeader'}
          fullName={getUserFullName(onBoardingProfile)}
          address={getUserAddress(onBoardingProfile)}
          profilePhoto={profilePhoto}
          dispatch={dispatch}
          icon={CommonIcons.regionalSetting}
        />
        {/* Title view */}
        <View style={styles.headerContainer}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{I18n.t('REGIONAL_SETTINGS')}</Text>
          </View>
          <Line styleProp={styles.lineStyle} />
        </View>
        <View testID={'containerView'} style={styles.contentView}>
          <RegionalPicker
            title={I18n.t('PREFERED_LANG')}
            selectedOption={selectedLanguage}
            options={languages}
            icon={selectedFlag}
            onChange={(itemValue) => this.onChangeLanguage(itemValue)}
          />
          <RegionalPicker
            title={I18n.t('DEFAULT_CURRENCY')}
            selectedOption={selectedCurrency}
            options={currency}
            icon={selectedCurrencyIcon}
            onChange={(itemValue) => this.onChangeCurrency(itemValue)}
          />
        </View>
        <View style={[styles.buttonView]}>
          <View style={styles.changeView}>
            <Button
              text={I18n.t('SAVE_CHANGES')}
              withShadow={true}
              withBg={true}
              testID={'requestChange'}
              onClick={() => this.onSaveChanges()}
            />
          </View>
          <View style={styles.backView}>
            <Button
              text={I18n.t('BACK_BUTTON')}
              withBorder={true}
              testID={'back'}
              onClick={() => Navigator.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * On change default language
   * @param {string} itemValue  Selected default language
   */
  onChangeLanguage(itemValue) {
    let selectedFlag
    switch (itemValue) {
      case DefaultStrings.ENG:
        selectedFlag = CommonIcons.USFlag
        break
      case DefaultStrings.SPA:
        selectedFlag = CommonIcons.Spanish
        break
      case DefaultStrings.EST:
        selectedFlag = CommonIcons.Estonia
        break
    }
    this.setState({ selectedLanguage: itemValue, selectedFlag })
  }

  /**
   * On change default currency
   * @param {string} itemValue selected  currency value
   */
  onChangeCurrency(itemValue) {
    let selectedCurrencyIcon
    switch (itemValue) {
      case DefaultStrings.TYPE_USD:
        selectedCurrencyIcon = Currencies.USD
        break
      case DefaultStrings.VALUE_EURO:
        selectedCurrencyIcon = Currencies.Euro
        break
    }
    this.setState({ selectedCurrency: itemValue, selectedCurrencyIcon })
  }

  // On save changes button action
  onSaveChanges() {
    const { selectedLanguage, selectedCurrency } = this.state

    const regionalData = {
      language: selectedLanguage,
    }
    const fiatData = {
      default_currency: selectedCurrency,
    }

    this.props.changeLanguage(regionalData, () => {
      this.updateProfileInfo()
      this.props.changeFiatCurrency(fiatData, () => {
        this.updateProfileInfo()
        transactionAlert(I18n.t('HEADER'), I18n.t('SUCCESSFULLY_UPDATED')) // show alert
      })
    })
  }

  // update profile information in store after Api Success
  updateProfileInfo() {
    const { selectedLanguage, selectedCurrency } = this.state
    const profileData = {
      ...this.props.onBoardingProfile,
      default_currency: selectedCurrency,
      language: selectedLanguage,
    }
    I18n.locale = selectedLanguage // get user default language
    this.props.setOnBoardingProfile(profileData)
  }
}

RegionalSettingsScreen.propTypes = {
  onBoardingProfile: PropTypes.object,
  profilePhoto: PropTypes.string,
  language: PropTypes.string,
  defaultCurrency: PropTypes.string,
  setOnBoardingProfile: PropTypes.func,
  changeFiatCurrency: PropTypes.func,
  changeLanguage: PropTypes.func,
  dispatch: PropTypes.func,
}
// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
  profilePhoto: state.user.profilePhoto,
  language: state.user.language,
  defaultCurrency: state.user.defaultCurrency,
})
// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
  changeFiatCurrency: (data, successFn) =>
    dispatch(UserActions.changeFiatCurrency(data, successFn)),
  changeLanguage: (data, successFn) => dispatch(UserActions.changeLanguage(data, successFn)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionalSettingsScreen)

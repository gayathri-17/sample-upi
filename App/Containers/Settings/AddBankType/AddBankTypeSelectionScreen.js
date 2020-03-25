import React, { Component } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import styles from './AddBankTypeSelectionStyle'
import Line from 'App/Components/Line/Line'
import PropTypes from 'prop-types'
import ProfileHeader from 'App/Components/ProfileHeader/ProfileHeader'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import I18n from 'App/Localization/I18n'
import { connect } from 'react-redux'
import { getUserFullName, getUserAddress } from 'App/Components/Utils/Functions'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'

/**
 *  user can select their Bank type here
 */

export class AddBankTypeSelection extends Component {
  render() {
    const { onBoardingProfile, profilePhoto, dispatch } = this.props
    const { isFromOnBoarding } = this.props.navigation.state.params || {}
    return (
      <SafeAreaView style={styles.container}>
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
        {isFromOnBoarding ? (
          <>
            <Header
              testID={'Header'}
              titleText={I18n.t('ADD_NEW_BANK_ACCOUNT_TITLE')}
              isSeparatorHidden={true}
            />
          </>
        ) : (
          <>
            <Text testID={'titleText'} style={styles.titleText}>
              {I18n.t('ADD_NEW_BANK_ACCOUNT_TITLE')}
            </Text>
            <Line styleProp={styles.titleLine} />
          </>
        )}
        <View style={styles.mainContainer}>
          <Button
            text={I18n.t('USA_BANK_ACCOUNT')}
            withBg={true}
            testID={'usaBank'}
            style={styles.usaButton}
            onClick={() => this.onButtonClicked(1, isFromOnBoarding)}
          />
          <Button
            text={I18n.t('EURO_BANK_ACCOUNT')}
            withBg={true}
            testID={'euroBank'}
            style={styles.euroButton}
            onClick={() => this.onButtonClicked(2, isFromOnBoarding)}
          />
        </View>
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
   * user bank account type selection
   * @param {String} buttonType
   */
  onButtonClicked = (buttonType, isFromOnBoarding) => {
    if (buttonType === 1) {
      Navigator.navigate(
        isFromOnBoarding ? NavKeys.ADD_USA_BANK_ACCOUNT_FROM_ONBOARD : NavKeys.ADD_USA_BANK_ACCOUNT,
        { isFromOnBoarding }
      )
    } else
      Navigator.navigate(
        isFromOnBoarding ? NavKeys.ADD_EUR_BANK_ACCOUNT_FROM_ONBOARD : NavKeys.ADD_EUR_BANK_ACCOUNT,
        { isFromOnBoarding }
      )
  }

  /**
   * on click back function
   */
  onClickBack = () => {
    Navigator.goBack()
  }
}

AddBankTypeSelection.propTypes = {
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
  dispatch: dispatch,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBankTypeSelection)

import React from 'react'
import styles from './AccountTypeSelectionScreenStyle'
import { SafeAreaView, View, Alert } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from '../../Components/Header/Header'
import AccountTypeOptions from '../../Components/AccountTypeOption/AccountTypeOptions'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import NavKeys from '../../Constants/NavKeys'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import UserActions from 'App/Stores/User/Actions'
import I18n from 'App/Localization/I18n'
import DefaultStrings from 'App/Constants/DefaultStrings'

/*
 * user can select their account type here
 */
export class AccountTypeSelectionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCardText: '',
      selectedType: 0,
    }
  }

  render() {
    // To access current component state
    const { selectedCardText } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ToolBar testID={'ToolBar'} />
        <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
        <Header
          testID={'Header'}
          titleText={I18n.t('SELECT_ACCOUNT_TYPE')}
          description={I18n.t('SELECT_ACCOUNT_TYPE_DESC')}
        />
        <View style={styles.subContainer}>
          {/** card container (personal, business) */}
          <View style={styles.selectorContainer}>
            <AccountTypeOptions
              text={I18n.t('PERSONAL')}
              onClick={() => this.OnCardClicked(DefaultStrings.PERSONAL)}
              selectedText={selectedCardText}
              testID={'PersonalCard'}
            />
            <AccountTypeOptions
              text={I18n.t('BUSINESS')}
              onClick={() => this.OnCardClicked(DefaultStrings.BUSINESS)}
              selectedText={selectedCardText}
              testID={'BusinessCard'}
            />
          </View>
          {/** Buttons(Continue, back) container */}
          <View style={styles.buttonContainer}>
            <Button
              testID={'continue'}
              text={I18n.t('CONTINUE_BUTTON')}
              withShadow={true}
              withBg={true}
              onClick={this.onContinueClicked}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * @param {String} selectedText updates in state object by User select cardtype(Personal or Business)
   */
  OnCardClicked = (selectedText) => {
    this.setState({
      selectedCardText: selectedText,
      selectedType: selectedText === DefaultStrings.PERSONAL ? 1 : 2,
    })
  }

  // Proceed Your selected Account
  onContinueClicked = () => {
    if (this.state.selectedCardText.length === 0) {
      Alert.alert(I18n.t('ALERT'), I18n.t('ACCOUNT_TYPE_ERROR'), [
        {
          text: I18n.t('OK'),
          style: 'cancel',
        },
      ])
      return
    }
    const profileData = {
      ...this.props.onBoardingProfile,
      userType: this.state.selectedCardText.toLowerCase(),
      type_user: this.state.selectedType,
    }
    this.props.setOnBoardingProfile(profileData)
    Navigator.navigate(NavKeys.PERSONAL_INFORMATION)
  }
}

AccountTypeSelectionScreen.propTypes = {
  setOnBoardingProfile: PropTypes.func,
  onBoardingProfile: PropTypes.object,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  setOnBoardingProfile: (data) => dispatch(UserActions.setOnBoardingProfile(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTypeSelectionScreen)

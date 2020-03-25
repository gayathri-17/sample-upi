import React from 'react'
import styles from './DocumentTypeSelectionScreenStyle'
import { SafeAreaView, View, ScrollView, Alert, NativeModules } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import Header from 'App/Components/Header/Header'
import AccountTypeOptions from 'App/Components/AccountTypeOption/AccountTypeOptions'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import APIKeys from 'App/Constants/APIKeys'
import NavKeys from 'App/Constants/NavKeys'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'App/Localization/I18n'
import DefaultStrings from 'App/Constants/DefaultStrings'
import OnfidoDocumentType from 'App/Constants/OnfidoDocumentType'
import UserActions from 'App/Stores/User/Actions'
import SignUpActions from 'App/Stores/SignUp/Actions'

/*
 * user can select their document type here
 */
export class DocumentTypeSelectionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docType: 0,
      token: APIKeys.ONFIDO_TEST_KEY,
    }
  }

  render() {
    // To access current component state
    const { docType } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ToolBar testID={'ToolBar'} />
        <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
        <Header
          testID={'Header'}
          titleText={I18n.t('DOCUMENT_TYPE')}
          description={I18n.t('SELECT_DOCUMENT')}
        />
        <ScrollView style={styles.subContainer}>
          {/** card container (passport, license, id card) */}
          <View style={styles.selectorContainer}>
            <AccountTypeOptions
              text={I18n.t('PASSPORT')}
              textStyle={styles.cardText}
              onClick={() => this.OnCardClicked(OnfidoDocumentType.PASSPORT)}
              selectedText={docType === OnfidoDocumentType.PASSPORT ? DefaultStrings.PASSPORT : ''}
              testID={'PassportCard'}
            />
            <AccountTypeOptions
              text={I18n.t('LICENSE')}
              textStyle={styles.cardText}
              onClick={() => this.OnCardClicked(OnfidoDocumentType.LICENSE)}
              selectedText={docType === OnfidoDocumentType.LICENSE ? DefaultStrings.LICENSE : ''}
              testID={'LicenseCard'}
            />
            <AccountTypeOptions
              text={I18n.t('ID_CARD')}
              textStyle={styles.cardText}
              onClick={() => this.OnCardClicked(OnfidoDocumentType.ID_CARD)}
              selectedText={docType === OnfidoDocumentType.ID_CARD ? DefaultStrings.ID_CARD : ''}
              testID={'IdCard'}
            />
          </View>
          {/** Buttons(Continue, back) container */}
          <View style={styles.buttonContainer}>
            <Button
              testID={'continue'}
              text={I18n.t('CONTINUE_BUTTON')}
              withShadow={true}
              withBg={true}
              onClick={() => this.onClickContinue()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * @param {String} docType updates in state object by User select cardtype(passport, license or idcard)
   */
  OnCardClicked = (type) => {
    this.setState({ docType: type })
  }

  /**
   * Continue button action to navigate to next scren
   */
  onClickContinue() {
    if (this.state.docType === 0) {
      Alert.alert(I18n.t('ALERT'), I18n.t('DOCUMENT_TYPE_ERROR'), [
        {
          text: I18n.t('OK'),
          style: 'cancel',
        },
      ])
    } else {
      this.props.getOnfidoToken(this.launchSDK)
    }
  }

  /*
   * Launching onfido sdk by using native modules
   */
  launchSDK = (data) => {
    NativeModules.OnfidoSDK.startSDK(
      data.token,
      this.state.docType,
      'testID', // In latest version applicant ID not required
      () => {
        this.props.onfidoCheck(this.navigateToNestStep)
      },
      (errorCause) => {
        Alert.alert(I18n.t('ALERT'), errorCause, [
          {
            text: I18n.t('OK'),
            style: 'cancel',
          },
        ])
      }
    )
  }

  /**
   * navigate to next screen based on the account type
   */
  navigateToNestStep = () => {
    if (this.props.onBoardingProfile.type_user === 1) {
      Navigator.navigate(NavKeys.SECURITY_OPTIONS_FROM_ONBOARD, { isFromOnBoarding: true })
    } else {
      Navigator.navigate(NavKeys.BUSINESS_INFORMATION)
    }
  }
}
DocumentTypeSelectionScreen.propTypes = {
  onBoardingProfile: PropTypes.object,
  onfidoCheck: PropTypes.func,
  getOnfidoToken: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  onBoardingProfile: state.user.onBoardingProfile,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  onfidoCheck: (successFn) => dispatch(UserActions.onfidoCheck(successFn)),
  getOnfidoToken: (successFn) => dispatch(SignUpActions.getOnfidoToken(successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentTypeSelectionScreen)

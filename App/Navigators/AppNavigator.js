import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LocalAuthenticationScreen from 'App/Containers/LocalAuthenticationScreen/LocalAuthenticationScreen'
import LoginScreen from 'App/Containers/LoginScreen/LoginScreen'
import EntryScreen from 'App/Containers/EntryScreen/EntryScreen'
import SignUpScreen from 'App/Containers/SignUpScreen/SignUpScreen'
import TermsAndConditionsScreen from 'App/Containers/TermsAndConditionsScreen/TermsAndConditionsScreen'
import SignUpThanksScreen from 'App/Containers/SignUpThanksScreen/SignUpThanksScreen'
import SignupAccountProgressScreen from 'App/Containers/AccountProgressScreen/SignupAccountProgressScreen'
import AccountTypeSelectionScreen from 'App/Containers/AccountTypeSelection/AccountTypeSelectionScreen'
import PersonalInformationScreen from 'App/Containers/PersonalInformation/PersonalInformationScreen'
import PhoneVerificationScreen from 'App/Containers/PhoneVerificationScreen/PhoneVerificationScreen'
import AddressInformationScreen from 'App/Containers/AddressInformation/AddressInformationScreen'
import PhoneNumberValidationScreen from 'App/Containers/PhoneNumberValidationScreen/PhoneNumberValidationScreen'
import PhoneVerificationSuccessScreen from 'App/Containers/PhoneVerificationSuccessScreen/PhoneVerificationSuccessScreen'
import DocumentTypeSelectionScreen from 'App/Containers/DocumnentTypeSelectionScreen/DocumentTypeSelectionScreen'
import BusinessInformationScreen from 'App/Containers/BusinessInformation/BusinessInformationScreen'
import TransactionSuccessScreen from 'App/Containers/TransactionSuccess/TransactionSuccessScreen'
import ForgotPasswordScreen from 'App/Containers/ForgotPassword/ForgotPasswordScreen'
import ProfessionalInformationScreen from 'App/Containers/ProfessionalInformation/ProfessionalInformationScreen'
import UploadDocumentsScreen from 'App/Containers/UploadDocuments/UploadDocumentsScreen'
import SecurityScreen from 'App/Containers/Settings/SecurityScreen/SecurityScreen'
import AddBankTypeSelection from 'App/Containers/Settings/AddBankType/AddBankTypeSelectionScreen'
import AddUSABankAccountScreen from 'App/Containers/Settings/AddUSABankAccountScreen/AddUSABankAccountScreen'
import AddEuroBankAccountScreen from 'App/Containers/Settings/AddEuroBankAccountScreen/AddEuroBankAccountScreen'
import TabNavigator from './TabNavigator'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import SuccessMessageScreen from 'App/Containers/SuccessMessageScreen/SuccessMessageScreen'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: { header: null },
    },
    MainScreen: {
      screen: SplashScreen,
      navigationOptions: { header: null },
    },
    EntryScreen: {
      screen: EntryScreen,
      navigationOptions: { header: null },
    },
    LocalAuthenticationScreen: {
      screen: LocalAuthenticationScreen,
      navigationOptions: { header: null },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: { header: null },
    },
    SignUpScreen: {
      screen: SignUpScreen,
      navigationOptions: { header: null },
    },
    TermsAndConditionsScreen: {
      screen: TermsAndConditionsScreen,
      navigationOptions: { header: null },
    },
    SignUpThanksScreen: {
      screen: SignUpThanksScreen,
      navigationOptions: { header: null },
    },
    SignUpAccountProgressScreen: {
      screen: SignupAccountProgressScreen,
      navigationOptions: { header: null },
    },
    AccountTypeSelectionScreen: {
      screen: AccountTypeSelectionScreen,
      navigationOptions: { header: null },
    },
    PersonalInformationScreen: {
      screen: PersonalInformationScreen,
      navigationOptions: { header: null },
    },
    PhoneVerificationScreen: {
      screen: PhoneVerificationScreen,
      navigationOptions: { header: null },
    },
    AddressInformationScreen: {
      screen: AddressInformationScreen,
      navigationOptions: { header: null },
    },
    PhoneNumberValidationScreen: {
      screen: PhoneNumberValidationScreen,
      navigationOptions: { header: null },
    },
    PhoneVerificationSuccessScreen: {
      screen: PhoneVerificationSuccessScreen,
      navigationOptions: { header: null },
    },
    DocumentTypeSelectionScreen: {
      screen: DocumentTypeSelectionScreen,
      navigationOptions: { header: null },
    },
    BusinessInformationScreen: {
      screen: BusinessInformationScreen,
      navigationOptions: { header: null },
    },
    TransactionSuccessScreen: {
      screen: TransactionSuccessScreen,
      navigationOptions: { header: null },
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: { header: null },
    },
    ProfessionalInformationScreen: {
      screen: ProfessionalInformationScreen,
      navigationOptions: { header: null },
    },
    UploadDocumentsScreen: {
      screen: UploadDocumentsScreen,
      navigationOptions: { header: null },
    },
    SecurityScreenFromOnBoard: {
      screen: SecurityScreen,
      navigationOptions: { header: null },
    },
    AddBankTypeSelectionFromOnBoard: {
      screen: AddBankTypeSelection,
      navigationOptions: { header: null },
    },
    AddUSABankAccountScreenFromOnBoard: {
      screen: AddUSABankAccountScreen,
      navigationOptions: { header: null },
    },
    AddEuroBankAccountScreenFromOnBoard: {
      screen: AddEuroBankAccountScreen,
      navigationOptions: { header: null },
    },
    SuccessMessageScreen: {
      screen: SuccessMessageScreen,
      navigationOptions: { header: null },
    },

    TabScreen: TabNavigator,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'screen',
    defaultNavigationOptions: { header: <ToolBar /> },
  }
)

export default createAppContainer(StackNavigator)

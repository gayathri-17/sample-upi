import React from 'react'
import styles from './SignupAccountProgressScreenStyle'
import { Text, SafeAreaView } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import CardView from '../../Components/CardView/CardView'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import { View } from 'react-native-animatable'
import I18n from 'App/Localization/I18n'
/*
 * user can do their account process by steps
 */
export default class SignupAccountProgressScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ToolBar testID={'ToolBar'} />
        <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
        <Text style={styles.titleText}>{I18n.t('SIGNUP_PROGRESS_TITLE')}</Text>
        <View style={styles.cardContainer}>
          <CardView
            testID={'VerifyIdentity'}
            isEnable={true}
            circleValue={1}
            heading={I18n.t('VERIFY_YOUR_IDENTITY')}
            description={I18n.t('VERIFY_IDENTITY_DESC')}
            onClick={() => this.onVerifyIdentityClicked()}
          />
          <CardView
            testID={'SecureYourAccount'}
            isEnable={false}
            circleValue={2}
            heading={I18n.t('SECURE_YOUR_ACCOUNT')}
            description={I18n.t('SECURE_ACCOUNT_DESC')}
          />
          <CardView
            testID={'AddBankAccount'}
            isEnable={false}
            circleValue={3}
            heading={I18n.t('ADD_BANK_ACCOUNT')}
            description={I18n.t('ADD_BANK_ACCOUNT_DESC')}
          />
        </View>
      </SafeAreaView>
    )
  }

  // Navigate to the AccountType selection screen
  onVerifyIdentityClicked = () => {
    Navigator.navigate(NavKeys.ACCOUNT_TYPE_SELECTION)
  }
}

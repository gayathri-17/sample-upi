// Terms & conditons screen

import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import styles from './TermsAndConditionsScreenStyle'
import { SafeAreaView } from 'react-navigation'
import { PropTypes } from 'prop-types'
import Button from 'App/Components/Button/Button'
import Navigator from 'App/Services/NavigationService'
import I18n from 'App/Localization/I18n'
import APIKeys from 'App/Constants/APIKeys'

export default class TermsAndConditionsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTerms: props.navigation.state.params.isTerms,
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.scrollContainer}>
        <WebView style={styles.viewContainer} source={{ uri: APIKeys.TERMS_URL }} />
        <View style={styles.submitButtonContainer}>
          <Button
            testID="back"
            withBg={true}
            withShadow={true}
            text={I18n.t('BACK')}
            style={styles.submitButtonStyle}
            onClick={this.onClickBack}
          />
        </View>
      </SafeAreaView>
    )
  }
  // Go back to sign up page
  onClickBack = () => {
    Navigator.goBack()
  }
}

TermsAndConditionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

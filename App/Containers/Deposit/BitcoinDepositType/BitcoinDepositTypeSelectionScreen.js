import React, { Component } from 'react'
import { SafeAreaView, View, TouchableOpacity } from 'react-native'
import styles from './BitcoinDepositTypeSelectionScreenStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import Button from 'App/Components/Button/Button'
import { PropTypes } from 'prop-types'
import I18n from 'App/Localization/I18n'

/**
 *  user can select their deposit Type here
 */

export default class BitcoinDepositTypeSelectionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      screenType: props.navigation.state.params.screenType,
    }
  }

  render() {
    // To access current component state with simplified field of state
    const { selectedOption, screenType } = this.state

    return (
      <SafeAreaView>
        <DashboardTitle
          testID={'titleView'}
          title={I18n.t('DEPOSIT')}
          currency={screenType}
          subTitle={I18n.t('FROM')}
        />
        <View style={styles.typeContainer}>
          <Button
            text={I18n.t('OUTSIDE_MERCURY_CASH')}
            withBg={selectedOption === DefaultStrings.OUTSIDE_MERCURY_CASH}
            testID={'outsideMercury'}
            style={
              selectedOption === DefaultStrings.OUTSIDE_MERCURY_CASH
                ? styles.selectedButtonStyle
                : styles.buttonStyle
            }
            textStyle={
              selectedOption === DefaultStrings.OUTSIDE_MERCURY_CASH ? {} : styles.buttonText
            }
            onClick={() => this.onButtonClicked(DefaultStrings.OUTSIDE_MERCURY_CASH)}
          />
          <Button
            text={I18n.t('REQUEST_TO_CONTACT')}
            withBg={selectedOption === DefaultStrings.REQUEST_TO_CONTACT}
            testID={'requestContact'}
            style={
              selectedOption === DefaultStrings.REQUEST_TO_CONTACT
                ? styles.selectedButtonStyle
                : styles.buttonStyle
            }
            textStyle={
              selectedOption === DefaultStrings.REQUEST_TO_CONTACT ? {} : styles.buttonText
            }
            onClick={() => this.onButtonClicked(DefaultStrings.REQUEST_TO_CONTACT)}
          />
        </View>
        <TouchableOpacity testID={'backBtn'} style={styles.backImage} onPress={this.onClickBack}>
          <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
  /**
   * changing the state to the selected values
   * @param {String} selectedType user selected deposit type
   */
  onButtonClicked = (selectedType) => {
    this.setState({ selectedOption: selectedType })

    Navigator.navigate(NavKeys.BITCOIN_WALLET_SCREEN, {
      selectedType: selectedType,
      screenType: this.state.screenType,
    })
  }

  // Navigate to the Previous screen
  onClickBack = () => {
    Navigator.goBack()
  }
}
BitcoinDepositTypeSelectionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

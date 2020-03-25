import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native'
import styles from './RequestToContactScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import DefaultStrings from 'App/Constants/DefaultStrings'
import {
  renameContactObjectKey,
  showAlert,
  showRateAlert,
  RateApp,
} from 'App/Components/Utils/Functions'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import RNPickerSelect from 'react-native-picker-select'
import UserActions from 'App/Stores/User/Actions'
import Button from 'App/Components/Button/Button'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import I18n from 'App/Localization/I18n'
import { cryptocurrencyFormat } from 'App/Components/Utils/CurrencyDefinder'

/**
 *  user can request currency from their contact here
 */

export class RequestToContactScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.selectedType,
      walletAaddress: props.navigation.state.params.walletAaddress,
      screenType: props.navigation.state.params.screenType,
      currency: props.navigation.state.params.screenType,
      cryptoBalance: props.navigation.state.params.cryptoBalance,
      contactList: [],
      selectedValue: '',
      description: '',
      amountInUSD: '',
    }
  }

  /**
   * Initial callback to set state
   */
  componentDidMount() {
    this.getContactList()
  }

  render() {
    // to access current state
    const {
      description,
      contactList,
      selectedValue,
      amountInUSD,
      screenType,
      cryptoBalance,
    } = this.state

    // to access current props
    const { btcUsdValue, ethUsdValue, dashUsdValue } = this.props

    const actualCurrencyValue =
      screenType === DefaultStrings.TYPE_BTC
        ? btcUsdValue
        : screenType === DefaultStrings.TYPE_ETH
        ? ethUsdValue
        : dashUsdValue
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <DashboardTitle testID={'titleView'} title={I18n.t('REQUEST_TO_CONTACT')} />
          <View style={styles.inputCardContainer}>
            {contactList !== undefined && (
              <View style={styles.contactPicker}>
                <RNPickerSelect
                  testID={'countryPicker'}
                  style={{
                    inputIOS: [styles.inputTextStyle, styles.imputHeight],
                    inputAndroid: [styles.inputTextStyle, styles.imputHeight],
                  }}
                  placeholder={{}}
                  onValueChange={(itemValue, index) => {
                    this.onContactValueChange(index)
                  }}
                  value={selectedValue}
                  items={contactList}
                />
              </View>
            )}
            <TextInput
              testID={'description'}
              returnKeyType="done"
              placeholder={I18n.t('ENTER_DESCRIPTION')}
              value={description}
              style={[styles.inputTextStyle, styles.imputHeight]}
              onChangeText={(text) => this.onChangeDescription(text)}
            />
            <Text style={styles.amountHeader}>{I18n.t('THE_AMOUNT_OF')}</Text>
            <View
              style={[
                styles.inputTextStyle,
                styles.amountInputText,
                Platform.OS !== 'android' ? styles.imputHeight : {},
              ]}
            >
              <Text style={styles.dollerLogo}>$</Text>
              <TextInput
                testID={'amount'}
                returnKeyType="done"
                value={amountInUSD}
                style={styles.amountInput}
                keyboardType={'numeric'}
                onChangeText={(text) => this.onChangeUSDAmount(text)}
              />
            </View>
            <View
              style={[
                styles.inputTextStyle,
                styles.amountInputText,
                styles.convertedAmountContainer,
                screenType === DefaultStrings.TYPE_BTC
                  ? styles.BTCinput
                  : screenType === DefaultStrings.TYPE_ETH
                  ? styles.ETHinput
                  : styles.DASHinput,
              ]}
            >
              <Text style={styles.convertedName}>{screenType}</Text>
              <Text style={[styles.amountInput, styles.convertedAmount]}>
                {amountInUSD.length === 0 ? '' : (amountInUSD / actualCurrencyValue).toFixed(7)}
              </Text>
            </View>
            <Text style={styles.usdBalance}>
              {'( '}
              {cryptocurrencyFormat(cryptoBalance)} {I18n.t('AVAILABLE_IN_YOUR')} {screenType}{' '}
              {I18n.t('WALLET')} {' )'}
            </Text>
          </View>
          <Button
            testID={'sendEmail'}
            text={I18n.t('SEND_EMAIL')}
            withShadow={true}
            withBg={true}
            onClick={() => {
              this.onSendEmailClicked(this)
            }}
          />
          <TouchableOpacity
            testID={'cancelBtn'}
            style={styles.cancelImageContainer}
            onPress={this.onCancelClicked.bind(this)}
          >
            <CancelImage
              testID={'cancelImage'}
              width={styles.cancelImage.width}
              height={styles.cancelImage.height}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * close the screen and navigate toDashboard
   */
  onCancelClicked = () => {
    if (this.props.appRating) Navigator.navigateAndReset(NavKeys.TAB)
    else {
      showRateAlert(this.setAppRating)
    }
  }

  /**
   * set app rating to true
   */
  setAppRating = () => {
    this.props.setAppRating(true)
    RateApp()
  }

  /**
   * navigate to the QR code screen with required Param
   */
  onSendEmailClicked = () => {
    // to access current state
    const { selectedType, screenType, walletAaddress, amountInUSD } = this.state

    // to access current props
    const { btcUsdValue, ethUsdValue, dashUsdValue } = this.props

    const actualCurrencyValue =
      screenType === DefaultStrings.TYPE_BTC
        ? btcUsdValue
        : screenType === DefaultStrings.TYPE_ETH
        ? ethUsdValue
        : dashUsdValue

    if (amountInUSD.length === 0) {
      showAlert(I18n.t('PLEASE_ENTER_VALID_AMOUNT'))
      return
    }

    Navigator.navigate(NavKeys.DEPOSIT_QRCODE_SCREEN, {
      selectedType: selectedType,
      walletAaddress: walletAaddress,
      screenType: screenType,
      amount: (amountInUSD / actualCurrencyValue).toFixed(7),
    })
  }

  /**
   *
   * @param {String} description - refers user enter input as an description string
   *
   * It updates state object with description
   */
  onChangeDescription(description) {
    this.setState({
      description: description,
    })
  }

  /**
   *
   * @param {String} usdAmount - refers user enter input as an usdAmount string
   *
   * It updates state object with usdAmount
   */
  onChangeUSDAmount(usdAmount) {
    this.setState({
      amountInUSD: usdAmount,
    })
  }

  /**
   * change the state bu selected data
   * @param {number} index user selected data position
   */
  onContactValueChange = (index) => {
    this.setState({
      selectedValue: this.state.contactList[index].value,
    })
  }

  /**
   * get contact from api and update to local component
   */
  getContactList() {
    this.props.getContactList(this.state.currency, true, (list) => {
      // set contact list to component state
      this.checkListValidation(list.data)
      this.setState({ contactList: renameContactObjectKey(list.data) })
    })
  }

  /**
   * validate the response list
   * @param {Array} list response contact list
   */
  checkListValidation = (list) => {
    if (list === undefined || list.length === 0) {
      Alert.alert(
        I18n.t('ERROR'),
        I18n.t('PLEASE_ADD_CONTACT'),
        [
          {
            text: 'OK',
            onPress: function() {
              Navigator.goBack()
            },
          },
        ], // I want this function to make Saga continue
        { cancelable: false }
      )
    }
  }
}
RequestToContactScreen.propTypes = {
  getContactList: PropTypes.func,
  btcUsdValue: PropTypes.number,
  ethUsdValue: PropTypes.number,
  dashUsdValue: PropTypes.number,
  usdBalance: PropTypes.number,
  navigation: PropTypes.object.isRequired,
  appRating: PropTypes.bool,
  setAppRating: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  btcUsdValue: state.user.currentCurrency.BTC.base,
  ethUsdValue: state.user.currentCurrency.ETH.base,
  dashUsdValue: state.user.currentCurrency.DASH.base,
  usdBalance: state.wallet.getWalletBalance.USD[0].balance,
  appRating: state.user.appRating,
})

export const mapDispatchToProps = (dispatch) => ({
  getContactList: (coin, isLoader, successFn) =>
    dispatch(UserActions.getContactList(coin, isLoader, successFn)),
  setAppRating: (data) => dispatch(UserActions.setAppRating(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestToContactScreen)

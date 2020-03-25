import React, { Component } from 'react'
import { SafeAreaView, View, Text, ScrollView, Clipboard } from 'react-native'
import styles from './DepositQrCodeViewerScreenStyle'
import DefaultStrings from 'App/Constants/DefaultStrings'
import DashboardTitle from 'App/Components/DashboardTitle/DashboardTitle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Navigator from 'App/Services/NavigationService'
import Button from 'App/Components/Button/Button'
import CancelImage from 'App/Assets/Images/Svg/CancelImage'
import NavKeys from 'App/Constants/NavKeys'
import { QRCode } from 'react-native-custom-qr-codes'
import { PropTypes } from 'prop-types'
import I18n from 'App/Localization/I18n'

/**
 *  user can see their Bitcoin walletBalance here
 */

export default class DepositQrCodeViewerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: props.navigation.state.params.selectedType,
      walletAaddress: props.navigation.state.params.walletAaddress,
      screenType: props.navigation.state.params.screenType,
      amount: props.navigation.state.params.amount,
      isQrCode: false,
    }
  }

  render() {
    // access current state
    const { selectedType, walletAaddress, isQrCode, screenType } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <DashboardTitle
            testID={'titleView'}
            title={I18n.t('DEPOSIT')}
            currency={screenType}
            subTitle={I18n.t('FROM')}
            name={selectedType}
          />
          <View testID={'inputContainer'} style={styles.typeContainer}>
            {isQrCode ? (
              <QRCode
                codeStyle="square"
                logo={DefaultStrings.QR_CODE_LOGO_PATH}
                logoSize={50}
                content={this.getAddressByType(screenType)}
              />
            ) : (
              <Text style={styles.infoText}>{I18n.t('DEPOSIT_QR_TEXT')}</Text>
            )}
            <Text style={styles.walletAddress}>{walletAaddress}</Text>
            <View style={styles.buttonContainer}>
              <Button
                testID={'viewQRcodeBtn'}
                text={isQrCode ? I18n.t('COPY_ADDRESS') : I18n.t('VIEW_QR_CODE')}
                withShadow={true}
                withBg={true}
                onClick={() => this.viewQrCodeClicked()}
              />
              {!isQrCode && (
                <TouchableOpacity
                  testID={'copyAddress'}
                  style={styles.backButtonContainer}
                  onPress={this.copyAddressClicked.bind(this)}
                >
                  <Text style={styles.copyAddressStyle}>{I18n.t('COPY_ADDRESS')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={this.onCancelClicked.bind(this)}>
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
    Navigator.navigateAndReset(NavKeys.TAB)
  }

  /**
   * show the QR Code for user reference
   */
  viewQrCodeClicked = () => {
    if (!this.state.isQrCode) {
      this.setState({
        isQrCode: true,
      })
    } else {
      this.copyAddressClicked()
    }
  }

  /**
   * copy the address for user reference
   */
  copyAddressClicked = () => {
    Clipboard.setString(this.state.walletAaddress)
  }

  /**
   * get wallet address by type
   * @param {String} screenType user selectedType
   */
  getAddressByType = (screenType) => {
    const { walletAaddress, amount, selectedType } = this.state
    const isReqToContact = selectedType === DefaultStrings.REQUEST_TO_CONTACT
    switch (screenType) {
      case DefaultStrings.TYPE_BTC:
        return (
          DefaultStrings.ADDRESS_NAME_BITCOIN +
          walletAaddress +
          (isReqToContact ? DefaultStrings.DEPOSIT_AMOUNT + amount : '')
        )
      case DefaultStrings.TYPE_ETH:
        return (
          DefaultStrings.ADDRESS_NAME_ETHEREUM +
          walletAaddress +
          (isReqToContact ? DefaultStrings.DEPOSIT_AMOUNT + amount : '')
        )
      case DefaultStrings.TYPE_DASH:
        return (
          DefaultStrings.ADDRESS_NAME_DASH +
          walletAaddress +
          (isReqToContact ? DefaultStrings.DEPOSIT_AMOUNT + amount : '')
        )
    }
  }
}
DepositQrCodeViewerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

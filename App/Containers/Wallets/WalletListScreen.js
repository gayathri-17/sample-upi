import React from 'react'
import styles from './WalletListScreenStyle'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Modal,
  TextInput,
  findNodeHandle,
  Platform,
} from 'react-native'
import {
  getGradientArrayByType,
  showValidatonAlert,
  currencyFormat,
} from 'App/Components/Utils/Functions'
import USDLogo from 'App/Assets/Images/Svg/USDLogo'
import EuroLogo from 'App/Assets/Images/Svg/EuroLogo'
import BitcoinLogo from 'App/Assets/Images/Svg/BitcoinLogo'
import ETHLogo from 'App/Assets/Images/Svg/ETHLogo'
import DashLogo from 'App/Assets/Images/Svg/DashLogo'
import USDLogoDisable from 'App/Assets/Images/Svg/USDLogoDisable'
import BitcoinLogoDisable from 'App/Assets/Images/Svg/BitcoinLogoDisable'
import DashLogoDisable from 'App/Assets/Images/Svg/DashLogoDisable'
import ETHLogoDisable from 'App/Assets/Images/Svg/ETHLogoDisable'
import EuroLogoDisable from 'App/Assets/Images/Svg/EuroLogoDisable'
import { Colors } from 'App/Theme'
import LinearGradient from 'react-native-linear-gradient'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import Line from 'App/Components/Line/Line'
import DownArrow from 'App/Assets/Images/Svg/DownArrow'
import UpArrow from 'App/Assets/Images/Svg/UpArrow'
import QrCodeImage from 'App/Assets/Images/Svg/QRCode'
import SvgIcon from 'App/Components/SvgIcon/SvgIcon'
import CommonIcons from 'App/Assets/Images/Svg/CommonIcons'
import QRCodeWhite from 'App/Assets/Images/Svg/QRCodeWhite'
import { QRCode } from 'react-native-custom-qr-codes'
import { BlurView } from '@react-native-community/blur'
import I18n from 'App/Localization/I18n'
import CurrencySeperatorType from 'App/Constants/CurrencySeperatorType'
import {
  getMergedCryptoBalanceByType,
  cryptocurrencyFormat,
} from 'App/Components/Utils/CurrencyDefinder'
import EmptyListView from 'App/Components/EmptyListView/EmptyListView'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

/*
 * Wallet list screen where use can see their wallets based on their currencies
 */
export class WalletListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCurrency: DefaultStrings.TYPE_EURO,
      walletData: {},
      selectedWalletItem: {},
      editWalletItem: {},
      selectedHeaderName: '',
      currencyWallet: [],
      updatedWalletName: '',
      mercuryWalletSelected: false,
      isQrCodeView: false,
      viewRef: null,
    }
  }

  /*
   * Intial Function to get the wallet list
   */
  componentDidMount() {
    this.getWalletList()
    this.setState({ viewRef: findNodeHandle(this.parentView) })
  }

  render() {
    const {
      selectedCurrency,
      walletData,
      currencyWallet,
      mercuryWalletSelected,
      isQrCodeView,
      selectedWalletItem,
    } = this.state

    // to access current props
    const { usdBalance, euroBalance } = this.props
    const selectedGradientColor = getGradientArrayByType(selectedCurrency)

    return (
      <SafeAreaView
        style={styles.container}
        ref={(view) => {
          this.parentView = view
        }}
      >
        <View style={styles.currencySelectContainer}>
          {/* show currency view based on mercury wallet selected or not */}
          {mercuryWalletSelected ? (
            <View style={[styles.currencyView, styles.leftMarginForCurrency]}>
              <TouchableOpacity style={styles.currencyImageContainer}>
                <BitcoinLogo
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyImageContainer}>
                <ETHLogo
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.currencyImageContainer}>
                <DashLogo
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.currencyView}>
              <TouchableOpacity
                style={styles.currencyImageContainer}
                onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_EURO)}
              >
                {selectedCurrency === DefaultStrings.TYPE_EURO ? (
                  <EuroLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <EuroLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.currencyImageContainer}
                onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_USD)}
              >
                {selectedCurrency === DefaultStrings.TYPE_USD ? (
                  <USDLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <USDLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.currencyImageContainer}
                onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_BTC)}
              >
                {selectedCurrency === DefaultStrings.TYPE_BTC ? (
                  <BitcoinLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <BitcoinLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.currencyImageContainer}
                onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_ETH)}
              >
                {selectedCurrency === DefaultStrings.TYPE_ETH ? (
                  <ETHLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <ETHLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.currencyImageContainer}
                onPress={this.onPressCurrency.bind(this, DefaultStrings.TYPE_DASH)}
              >
                {selectedCurrency === DefaultStrings.TYPE_DASH ? (
                  <DashLogo
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                ) : (
                  <DashLogoDisable
                    width={styles.curencyIconSize.width}
                    height={styles.curencyIconSize.height}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
          {/* view for select mercury wallet and normal currencies */}
          <View style={styles.currencyView}>
            <TouchableOpacity
              style={styles.currencyImageContainer}
              onPress={this.onPressSelectWallet}
            >
              {!mercuryWalletSelected ? (
                <SvgIcon
                  xml={CommonIcons.logoSelect}
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              ) : (
                <SvgIcon
                  xml={CommonIcons.logoUnselect}
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.currencyImageContainer}
              onPress={this.onPressSelectMercuryWallet}
            >
              {mercuryWalletSelected ? (
                <SvgIcon
                  xml={CommonIcons.mercuryWalletSelect}
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              ) : (
                <SvgIcon
                  xml={CommonIcons.mercuryWalletUnselect}
                  width={styles.curencyIconSize.width}
                  height={styles.curencyIconSize.height}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* line view */}
        <LinearGradient
          colors={[Colors.ghostWhite, Colors.white]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
          style={styles.borderLineStyle}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{I18n.t('WALLET_NAME')}</Text>
          <Text style={styles.titleStyle}>{I18n.t('BALANCE')}</Text>
        </View>
        {!mercuryWalletSelected && (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {selectedCurrency === DefaultStrings.TYPE_USD ||
            selectedCurrency === DefaultStrings.TYPE_EURO ? (
              <View style={styles.fiatMainContainer}>
                <LinearGradient
                  colors={[selectedGradientColor[0], selectedGradientColor[1]]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0.8, y: 1 }}
                  style={styles.fiatGradientContainer}
                >
                  <View style={styles.fiatItemContainer}>
                    <Text style={styles.selectedWalletText}>
                      {selectedCurrency} {I18n.t('WALLET')}
                    </Text>
                    <Text style={[styles.selectedWalletText, styles.fiatWalletBalanceText]}>
                      {selectedCurrency === DefaultStrings.TYPE_USD
                        ? '$ ' + currencyFormat(usdBalance, CurrencySeperatorType.USD)
                        : '€ ' + currencyFormat(euroBalance, CurrencySeperatorType.USD)}
                    </Text>
                  </View>
                </LinearGradient>
                <Text style={styles.fiatWalletDescText}>
                  {I18n.t('FIAT_WALLET_DESC_FIRST')}
                  <Text style={styles.mercuryCashText}>
                    {I18n.t('MERCURY_DOT') + I18n.t('CASH') + '\n'}
                  </Text>
                  <Text style={styles.walletText}>
                    {selectedCurrency} {I18n.t('WALLET')}
                  </Text>
                  {I18n.t('FIAT_WALLET_DESC_SECOND')}
                </Text>
              </View>
            ) : selectedCurrency === DefaultStrings.TYPE_BTC ? (
              <View>
                {walletData[1] !== undefined &&
                  this.renderHeader(walletData[1], I18n.t('SEGWIT_ADDRESS'))}
                {walletData[2] !== undefined &&
                  this.renderHeader(walletData[2], I18n.t('LEGASY_ADDRESS'))}
              </View>
            ) : (
              <View
                style={[
                  styles.currencyContainer,
                  currencyWallet.length === 0 ? styles.listContentContainer : {},
                ]}
              >
                {currencyWallet.length > 0 ? (
                  currencyWallet.map((walletItem, index) =>
                    this.renderWalletItem(walletItem, index)
                  )
                ) : (
                  <EmptyListView
                    height={styles.emptyListImageStyle.height}
                    width={styles.emptyListImageStyle.width}
                    color={
                      selectedCurrency === DefaultStrings.TYPE_DASH
                        ? Colors.dashCurrency
                        : selectedCurrency === DefaultStrings.TYPE_ETH
                        ? Colors.etheriumCurrency
                        : Colors.mediumTurquoise
                    }
                    testID={'emptyList'}
                  />
                )}
              </View>
            )}
          </ScrollView>
        )}
        {/* modal for qr code */}
        <Modal animationType="fade" transparent={true} visible={isQrCodeView}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            viewRef={this.state.viewRef}
          />
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalInnerContiner,
                Platform.OS === 'android' ? styles.modelAndroidHeight : styles.modeliOSHeight,
              ]}
            >
              {selectedWalletItem.address && (
                <QRCode
                  codeStyle="square"
                  logo={DefaultStrings.QR_CODE_LOGO_PATH}
                  logoSize={50}
                  content={this.getAddressByType(selectedCurrency, selectedWalletItem.address)}
                />
              )}
              <Text style={styles.walletAddress}>{selectedWalletItem.address}</Text>
              <View style={styles.qrModalButtonConainer}>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.qrHideButtonStyle]}
                  onPress={this.viewQR.bind(this, false)}
                >
                  <Text style={styles.qrHideTextStyle}>{I18n.t('HIDE_QR')}</Text>
                  <QrCodeImage width={styles.imageStyle.width} height={styles.imageStyle.height} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.qrCopyButtonStyle]}
                  onPress={this.copyAddressClicked.bind(this, selectedWalletItem.address)}
                >
                  <Text style={styles.qrCopyTextStyle}>{I18n.t('COPY_ADDRESS')}</Text>
                  <SvgIcon
                    xml={CommonIcons.copyWhite}
                    width={styles.imageStyle.width}
                    height={styles.imageStyle.height}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }

  /**
   * get wallet address by type
   * @param {String} screenType user selectedType
   * @param {String} address selected wallet address
   */
  getAddressByType = (screenType, address) => {
    switch (screenType) {
      case DefaultStrings.TYPE_BTC:
        return DefaultStrings.ADDRESS_NAME_BITCOIN + address
      case DefaultStrings.TYPE_ETH:
        return DefaultStrings.ADDRESS_NAME_ETHEREUM + address
      case DefaultStrings.TYPE_DASH:
        return DefaultStrings.ADDRESS_NAME_DASH + address
    }
  }

  /**
   * on press mercury wallets
   */
  onPressSelectMercuryWallet = () => {
    this.setState({ mercuryWalletSelected: true })
  }

  /**
   * on press normal wallets
   */
  onPressSelectWallet = () => {
    this.setState({ mercuryWalletSelected: false })
  }
  /**
   * get wallet list
   */
  getWalletList = () => {
    // to access current state
    const { selectedCurrency } = this.state
    if (
      selectedCurrency !== DefaultStrings.TYPE_USD &&
      selectedCurrency !== DefaultStrings.TYPE_EURO
    )
      this.props.getBTCBalance(this.state.selectedCurrency, this.getBallance)
  }

  /**
   * get crypto balance by type
   * @param {*} data balance list based on type
   */
  getBallance = (data) => {
    const balanceData = getMergedCryptoBalanceByType(data, this.state.selectedCurrency)
    this.setState({
      walletData: balanceData.groupedData,
      currencyWallet: balanceData.mergedData,
      selectedWalletItem: this.state.selectedWalletItem,
      editWalletItem: {},
      updatedWalletName: '',
    })
  }

  /**
   * change currency type to get wallet list
   * @param {String} type - refers currency string
   */
  onPressCurrency = (type) => {
    if (
      type === DefaultStrings.TYPE_BTC ||
      type === DefaultStrings.TYPE_ETH ||
      type === DefaultStrings.TYPE_DASH ||
      type === DefaultStrings.TYPE_USD ||
      type === DefaultStrings.TYPE_EURO
    ) {
      this.setState({ selectedCurrency: type }, this.getWalletList)
    }
  }

  /**
   * render header view by the Type
   * @param {Object} item
   * @param {String} name
   * @returns rendered HeaderView
   */
  renderHeader = (item, name) => {
    // access current state
    const { selectedHeaderName } = this.state

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={this.onHeaderClicked.bind(this, name)}
          style={styles.headerTitleContaoner}
        >
          <Text style={styles.walletTitleText}>{name}</Text>
          {selectedHeaderName === name ? (
            <UpArrow width={styles.arrowIcon.width} height={styles.arrowIcon.height} />
          ) : (
            <DownArrow width={styles.arrowIcon.width} height={styles.arrowIcon.height} />
          )}
        </TouchableOpacity>
        {selectedHeaderName === name &&
          (item.length > 0 ? (
            item.map((walletItem, index) => this.renderWalletItem(walletItem, index))
          ) : (
            <View style={styles.emptyListHolder}>
              <EmptyListView
                height={styles.emptyListImageStyle.height}
                width={styles.emptyListImageStyle.width}
                color={Colors.bitcoinCurrency}
                testId={'bitcoinEmptyList'}
              />
            </View>
          ))}
        <Line styleProp={styles.lineStyle} />
      </View>
    )
  }

  /**
   * render item view
   * @param {Object} item
   * @param {number} index
   * @returns rendered wallet item
   */
  renderWalletItem = (item, index) => {
    // to access current state
    const { selectedWalletItem, selectedCurrency, editWalletItem, updatedWalletName } = this.state

    // to access current props
    const isSelectedItem = selectedWalletItem.address === item.address
    const isEditWalletItem = editWalletItem.address === item.address
    const selectedGradientColor = getGradientArrayByType(selectedCurrency)
    const editableHeight =
      Platform.OS === 'android' ? styles.editWalletItemAndroidHeight : styles.editWalletItemHeight

    return (
      <LinearGradient
        colors={
          isSelectedItem
            ? [selectedGradientColor[0], selectedGradientColor[1]]
            : [Colors.ghostWhite, Colors.ghostWhite]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={[
          isSelectedItem ? styles.gradientSelectedContainer : styles.gradientContainer,
          isEditWalletItem && editableHeight,
        ]}
      >
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={this.onWalletItemClicked.bind(this, item)}
        >
          <View style={styles.nameContinerMargin}>
            <View style={styles.nameContainer}>
              <Text
                style={[
                  styles.nameText,
                  styles.unselectedItemName,
                  selectedCurrency === DefaultStrings.TYPE_BTC
                    ? styles.unselectednameBTC
                    : selectedCurrency === DefaultStrings.TYPE_ETH
                    ? styles.unselectednameETH
                    : styles.unselectednameDASH,
                  isSelectedItem ? styles.selectedNameText : {},
                ]}
              >
                {item.alias}
              </Text>
              <Text
                style={[
                  styles.amountText,
                  styles.unselectedItemName,
                  selectedCurrency === DefaultStrings.TYPE_BTC
                    ? styles.unselectednameBTC
                    : selectedCurrency === DefaultStrings.TYPE_ETH
                    ? styles.unselectednameETH
                    : styles.unselectednameDASH,
                  isSelectedItem ? styles.selectedNameText : {},
                ]}
                numberOfLines={1}
              >
                {cryptocurrencyFormat(item.balance) + ' ' + selectedCurrency}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text
                style={[
                  styles.nameText,
                  styles.unselectedItemAddress,
                  isSelectedItem ? styles.selectedNameText : {},
                ]}
                numberOfLines={1}
              >
                {item.address}
              </Text>
              <Text
                style={[
                  styles.amountText,
                  styles.unselectedItemAddress,
                  isSelectedItem ? styles.selectedNameText : {},
                ]}
              >
                {' ' + item.fiatBalance}
              </Text>
            </View>
          </View>
          {isSelectedItem && !isEditWalletItem && (
            <View style={styles.buttonViewContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.editWallet.bind(this, item)}
              >
                <Text style={styles.textStyle}>{I18n.t('EDIT_LABEL')}</Text>
                <SvgIcon
                  xml={CommonIcons.whitePencil}
                  width={styles.imageStyle.width}
                  height={styles.imageStyle.height}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.viewQR.bind(this, true)}>
                <Text style={styles.textStyle}>{I18n.t('VIEW_QR')}</Text>
                <QRCodeWhite width={styles.imageStyle.width} height={styles.imageStyle.height} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.copyAddressClicked.bind(this, item.address)}
              >
                <Text style={styles.textStyle}>{I18n.t('COPY_ADDRESS')}</Text>
                <SvgIcon
                  xml={CommonIcons.copyWhite}
                  width={styles.imageStyle.width}
                  height={styles.imageStyle.height}
                />
              </TouchableOpacity>
            </View>
          )}
          {isEditWalletItem && (
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputStyle, Platform.OS === 'android' ? {} : styles.iOSInputStyle]}
                  value={updatedWalletName}
                  onChangeText={this.updatedWalletName}
                  placeholder={I18n.t('LABEL_NAME')}
                />
              </View>
              <View style={styles.editButtonContainer}>
                <TouchableWithoutFeedback
                  style={styles.buttonStyle}
                  onPress={this.editWallet.bind(this, {})}
                >
                  <Text style={styles.textStyle}>{I18n.t('CANCEL')}</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={styles.buttonStyle}
                  onPress={this.changeWalletName}
                >
                  <Text style={styles.textStyle}>{I18n.t('CHANGE_NAME')}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  /**
   * copy the address for user reference
   */
  copyAddressClicked = (address) => {
    Clipboard.setString(address)
  }

  /**
   * user clicked wallet item
   * @param {Object} item
   */
  onWalletItemClicked = (item) => {
    this.setState({
      selectedWalletItem: item,
    })
  }

  /**
   * view or hide qr code
   */
  viewQR = (value) => {
    this.setState({ isQrCodeView: value })
  }

  /**
   * edit wallet alias
   */
  editWallet = (item) => {
    this.setState({ editWalletItem: item })
  }

  /**
   * copy wallet address
   * @param {String} text to be changed in updated wallet name
   */
  updatedWalletName = (text) => {
    this.setState({ updatedWalletName: text })
  }

  /**
   * user clicked header item
   * @param {String} name selected header name
   */
  onHeaderClicked = (name) => {
    const isSameDataSelected = this.state.selectedHeaderName === name
    this.setState({
      selectedHeaderName: isSameDataSelected ? '' : name,
    })
  }

  /**
   * change wallet name
   */
  changeWalletName = () => {
    const { updatedWalletName, editWalletItem } = this.state

    if (updatedWalletName.trim().length < 5) {
      showValidatonAlert(I18n.t('PLEASE_ENTER_VALID_ALIAS_NAME'))
      return
    }
    const data = {
      uuid: editWalletItem.uuid,
      alias: updatedWalletName.trim(),
    }
    this.props.updateWallet(data, this.refreshWallet, this.walletUpdateFailure)
  }

  /**
   * refresh wallet
   */
  refreshWallet = (data) => {
    this.getWalletList()
  }

  /**
   * wallet update failure
   */
  walletUpdateFailure = (data) => {
    showValidatonAlert(data)
  }
}
WalletListScreen.propTypes = {
  getBTCBalance: PropTypes.func,
  etheriuBalance: PropTypes.array,
  bitCoinBalance: PropTypes.array,
  dashBalance: PropTypes.array,
  usdBalance: PropTypes.number,
  euroBalance: PropTypes.number,
  btcUsdValue: PropTypes.number,
  ethUsdValue: PropTypes.number,
  dashUsdValue: PropTypes.number,
  updateWallet: PropTypes.func,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  bitCoinBalance: state.wallet.getWalletBalance.BTC,
  etheriuBalance: state.wallet.getWalletBalance.ETH,
  dashBalance: state.wallet.getWalletBalance.DASH,
  usdBalance: state.wallet.getWalletBalance.USD[0].balance,
  euroBalance: state.wallet.getWalletBalance.EUR[0].balance,
  btcUsdValue: state.user.currentCurrency.BTC.base,
  ethUsdValue: state.user.currentCurrency.ETH.base,
  dashUsdValue: state.user.currentCurrency.DASH.base,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBTCBalance: (screenType, successFn) =>
    dispatch(WalletActions.getBitcoinBalance(screenType, successFn)),
  updateWallet: (data, successFn, failureFn) =>
    dispatch(WalletActions.updateWallet(data, successFn, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletListScreen)

import React from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import BackArrow from 'App/Assets/Images/Svg/BackArrow'
import ForwardArrow from 'App/Assets/Images/Svg/ForwardArrow'
import DefaultStrings from 'App/Constants/DefaultStrings'
import Navigator from 'App/Services/NavigationService'
import styles from './SendUploadDocumentScreenStyle'
import Line from 'App/Components/Line/Line'
import DocumentPicker from 'react-native-document-picker'
import {
  getImage,
  getWalletName,
  getAcronymForName,
  showAlert,
} from 'App/Components/Utils/Functions'
import { currencyFormat } from 'App/Components/Utils/CurrencyDefinder'
import { Switch } from 'App/Components/Switch/Switch'
import UserActions from 'App/Stores/User/Actions'
import Colors from 'App/Theme/Colors'
import UploadImageWhite from 'App/Assets/Images/Svg/UploadImageWhite'
import CheckMarkWhite from 'App/Assets/Images/Svg/CheckMarkWhite'
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import ActionSheet from 'App/Components/ActionSheet'
import I18n from 'App/Localization/I18n'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CurrencyType from 'App/Constants/CurrencyType'
import ErrorModal from 'App/Components/Modal/ErrorModal/ErrorModal'

/**
 * send upload document screen where user can upload their invoices
 */
console.disableYellowBox = true
export class SendUploadDocumentScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switchValue: props.transfer.support,
      isUploaded: false,
      document: '',
      fileName: '',
      description: '',
      captions: {
        image: I18n.t('IMAGE'),
        document: I18n.t('DOCUMENT'),
        cancel: I18n.t('CANCEL'),
        title: I18n.t('PICK_TYPE_OF_MEDIA'),
      },
      isNeeded: props.transfer.support,
      apiRequestFailure: false,
      requestErrMessage: '',
    }
  }

  render() {
    const {
      switchValue,
      isUploaded,
      fileName,
      description,
      isNeeded,
      apiRequestFailure,
      requestErrMessage,
    } = this.state
    const { transfer } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.container}
          enabled
          keyboardVerticalOffset={100}
        >
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            {/* amount detail container */}
            <View style={[styles.detailContainer, styles.margin]}>
              <View style={styles.detailTransferContainer}>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {I18n.t('YOU_TRANSFER')}
                  </Text>
                  <Text
                    style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}
                  >
                    {currencyFormat(transfer.transfer, transfer.currency)} {transfer.currency}
                  </Text>
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {I18n.t('FEE')}
                  </Text>
                  <Text
                    style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}
                  >
                    {currencyFormat(transfer.fee, transfer.currency)} {transfer.currency}
                  </Text>
                </View>
              </View>
              <Line styleProp={styles.lineStyle} />
              <View style={styles.detailGetContainer}>
                <View style={styles.detailTextContainer}>
                  <Text style={[styles.detailTextStyle, styles.titleTextStyle]}>
                    {I18n.t('RECEIPENT_GETS')}
                  </Text>
                  <Text
                    style={[styles.detailTextStyle, styles.titleTextStyle, styles.textLeftAlign]}
                  >
                    {currencyFormat(transfer.paid, transfer.currency)} {transfer.currency}
                  </Text>
                </View>
              </View>
            </View>
            {/* from to view */}
            <View style={[styles.fromToContainer, styles.margin]}>
              <View style={styles.fromToHeaderContainer}>
                <Text style={styles.fromToTextStyle}>{I18n.t('TO')}</Text>
                <View style={styles.textLogoContainer}>
                  {transfer.type === DefaultStrings.TYPE_CONTACT && (
                    <View style={styles.circleStyle}>
                      <Text style={styles.acronymTextStyle}>{getAcronymForName(transfer.to)}</Text>
                    </View>
                  )}
                  <Text style={styles.fromToAddressTextStyle}>{transfer.to}</Text>
                </View>
              </View>
              <View style={styles.fromToHeaderContainer}>
                <Text style={styles.fromToTextStyle}>{I18n.t('FROM')}</Text>
                <View style={styles.textLogoContainer}>
                  {getImage(transfer.currency)}
                  <Text style={[styles.fromToAddressTextStyle, styles.leftMargin]}>
                    {getWalletName(transfer.currency)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.uploadDocumentContainer}>
              <View style={styles.invoiceTextContainer}>
                <Text style={styles.invoiceTextStyle}>{I18n.t('PAYING_INVOICE')}</Text>
                <Switch
                  disabled={isUploaded || isNeeded}
                  value={switchValue}
                  onValueChange={this.toggleSwitch}
                  activeText={'Yes'}
                  inActiveText={I18n.t('NO')}
                  circleSize={styles.switchStyle.width}
                  barHeight={styles.switchStyle.height}
                  circleBorderWidth={0}
                  backgroundActive={Colors.mediumTurquoise}
                  backgroundInactive={Colors.lightGrey}
                  circleActiveColor={Colors.white}
                  circleInActiveColor={Colors.white}
                  changeValueImmediately={true}
                  renderActiveText={switchValue}
                  renderInActiveText={!switchValue}
                  switchLeftPx={styles.switchStyle.margin}
                  switchRightPx={styles.switchStyle.margin}
                  switchWidthMultiplier={styles.switchStyle.margin}
                />
              </View>
            </View>
            {/* upload document */}
            {switchValue && (
              <TouchableWithoutFeedback style={[styles.documentContainer]} onPress={this.pickDoc}>
                <Text style={styles.documentText} numberOfLines={1}>
                  {isUploaded ? fileName : I18n.t('UPLOAD_INVOICE')}
                </Text>
                <TouchableOpacity testID="pickDoc">
                  {!isUploaded ? (
                    <UploadImageWhite
                      width={styles.uploadImageStyle.width}
                      height={styles.uploadImageStyle.height}
                    />
                  ) : (
                    <CheckMarkWhite
                      width={styles.uploadImageStyle.width}
                      height={styles.uploadImageStyle.height}
                    />
                  )}
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            )}
            {/* image descrption container */}
            {switchValue && (
              <View style={styles.descriptionContainer}>
                <TextInput
                  value={description}
                  returnKeyType="done"
                  multiline
                  blurOnSubmit={true}
                  style={styles.descriptionTextStyle}
                  onChangeText={this.onChangeDescription}
                  placeholder={I18n.t('REASON_FOR_TRANSACTION')}
                />
              </View>
            )}
            {/* Forward and backward view */}
            <View style={styles.arrowContainer}>
              <View style={[styles.rowStyle, styles.arrowContainerStyle]}>
                <TouchableOpacity onPress={this.onPressBackward} testID="forwardArrow">
                  <BackArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressForward} testID="backwardArrow">
                  <ForwardArrow width={styles.arrowStyle.width} height={styles.arrowStyle.height} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Error Modal to retry api failure */}
            <ErrorModal
              isShow={apiRequestFailure}
              isHideClose={false}
              onCLickClose={this.onPressBackward}
              onClickSubmit={this.onPressForward}
              submitButtonTitle={I18n.t('RETRY')}
              errorMessage={requestErrMessage || I18n.t('NETWORK_ERROR')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  /**
   * on change description text
   * @param {String} text - refers param to set description text
   */
  onChangeDescription = (text) => {
    this.setState({ description: text })
  }

  /**
   * open the filemanager to pick the Documents
   * And it will convert the file to Base64
   */
  pickDoc = () => {
    if (Platform.OS === 'ios') {
      return this.pickIOS()
    } else {
      return new Promise((resolve, reject) => {
        return this.pickDocument(resolve, reject)
      })
    }
  }

  /**
   * open the filemanager for iOS to pick the Images and Document
   */
  pickIOS = () => {
    return new Promise((resolve, reject) => {
      const { image, document, cancel, title } = this.state.captions
      const options = [image, document, cancel]
      const handlers = [this.pickImage, this.pickDocument, this.pickClosed]
      const cancelButtonIndex = options.indexOf(cancel)
      ActionSheet.showActionSheetWithOptions(
        { options, cancelButtonIndex, title },
        (buttonIndex) => {
          handlers[buttonIndex](resolve, reject)
        }
      )
    })
  }

  /**
   * open the filemanager for iOS to pick the Images
   * And it will convert the file to Base64
   */
  pickImage = (resolve, reject) => {
    const options = {
      title: '',
      quality: 0.1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const { data: b64Content, type: fileType } = response // response data whick user selected image
        const b64 = b64Content // Base64 data of user selected image
        const fileExtension = String(fileType).substr(String(fileType).indexOf('/') + 1) // user selected image file extension
        this.setState({
          isUploaded: true,
          document: b64,
          fileName: response.fileName || 'image.png',
        })
        resolve({ b64, fileType, fileExtension })
      }
    })
  }

  /**
   * open the filemanager  to pick the Document
   * And it will convert the file to Base64
   */
  pickDocument = async (resolve, reject) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      }) // response data whick user selected documents
      this.pickDocResult(resolve, reject, result)
    } catch (_a) {
      reject(new Error('Action cancelled!')) // reject action and Log the Action
    }
  }

  /**
   * pick document callback
   * @param {*} result selected document result
   */
  pickDocResult = async (resolve, reject, result) => {
    const fileType = result.type // user selected document type
    const fileExtension = fileType.substr(fileType.indexOf('/') + 1) // user selected image file extension
    const realURI = Platform.select({ android: result.uri, ios: decodeURI(result.uri) })
    const b64Content = await RNFS.readFile(realURI, 'base64')
    const b64 = b64Content // Base64 data of user selected image
    this.setState({ isUploaded: true, document: b64, fileName: result.name })
    resolve({ b64, fileType, fileExtension })
  }

  /**
   * close the filemanager picker popup
   */
  pickClosed = (_, reject) => {
    reject(new Error('Action cancelled!')) // reject action and Log the Action
  }

  /**
   * change toggle switch value
   * @param {Object} value - refers param to set switch value
   */
  toggleSwitch = (value) => {
    this.setState({ switchValue: value })
  }

  /**
   * After amount entered to move forwrd to authentication process
   */
  onPressForward = () => {
    this.setState({ apiRequestFailure: false })
    const { document, isNeeded } = this.state
    if (isNeeded) {
      if (document && document.length > 0) {
        this.moveTransactionScreen()
      } else {
        showAlert(I18n.t('PLEASE_UPLOAD_DOCUMENT'))
      }
    } else {
      this.moveTransactionScreen()
    }
  }

  moveTransactionScreen = () => {
    const { description, document, fileName } = this.state
    let transferData = {
      ...this.props.transfer,
      description: description,
      fileName: fileName,
      document: document,
      isUploaded: true,
    }
    this.props.setTransfer(transferData)

    this.processTransaction()
  }

  processTransaction = () => {
    const { description, document } = this.state
    const { transfer } = this.props
    let reqData = {
      hash: transfer.hash_key,
      document: document,
      comment: description,
    }
    switch (transfer.currency) {
      case DefaultStrings.TYPE_USD:
      case CurrencyType.EURO:
      case CurrencyType.EURO_NAME:
        if (transfer.type === DefaultStrings.TYPE_CONTACT) {
          this.props.confirmContactTransfer(reqData, this.handleRequestFailure)
        } else {
          this.props.confirmBankTransfer(reqData, this.handleRequestFailure)
        }
        break
      default:
        this.props.confirmCryptoTransfer(reqData, this.handleRequestFailure)
    }
  }

  /**
   * handle api request failure
   */
  handleRequestFailure = (error) => {
    this.setState({ apiRequestFailure: true, requestErrMessage: error })
  }

  /**
   * Navigate to previous screen
   */
  onPressBackward = () => {
    Navigator.goBack()
  }
}

SendUploadDocumentScreen.propTypes = {
  transfer: PropTypes.object,
  setTransfer: PropTypes.func,
  getSecurityMethods: PropTypes.func,
  confirmBankTransfer: PropTypes.func,
  confirmCryptoTransfer: PropTypes.func,
  confirmContactTransfer: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  transfer: state.user.transfer,
})

export const mapDispatchToProps = (dispatch) => ({
  getSecurityMethods: (successFn) => dispatch(UserActions.getSecurityMethods(successFn)),
  setTransfer: (transfer) => dispatch(UserActions.setTransfer(transfer)),
  confirmBankTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmBankTransfer(data, failureFn)),
  confirmCryptoTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmCryptoTransfer(data, failureFn)),
  confirmContactTransfer: (data, failureFn) =>
    dispatch(UserActions.confirmContactTransfer(data, failureFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendUploadDocumentScreen)

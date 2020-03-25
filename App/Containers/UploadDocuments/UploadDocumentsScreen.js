import React from 'react'
import styles from './UploadDocumentsStyle'
import { SafeAreaView, View, Text, Platform } from 'react-native'
import ToolBar from 'App/Components/ToolBar/ToolBar'
import TitleView from 'App/Components/TitleView/TitleView'
import DefaultStrings from '../../Constants/DefaultStrings'
import Header from '../../Components/Header/Header'
import Button from 'App/Components/Button/Button'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import UploadImage from 'App/Assets/Images/Svg/Upload'
import CircleChecked from 'App/Assets/Images/Svg/CircleChecked'
import Info from 'App/Assets/Images/Svg/Info'
import SignupActions from 'App/Stores/SignUp/Actions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Navigator from 'App/Services/NavigationService'
import { businessDocAlert } from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import NavKeys from 'App/Constants/NavKeys'
import DocumentPicker from 'react-native-document-picker'
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import ActionSheet from 'App/Components/ActionSheet'

/*
 * User can give their Business Related Documents here
 */
export class UploadDocumentsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      businessDocList: [],
      initialState: true,
      captions: {
        image: I18n.t('IMAGE'),
        document: I18n.t('DOCUMENT'),
        cancel: I18n.t('CANCEL'),
        title: I18n.t('PICK_TYPE_OF_MEDIA'),
      },
      selectedItem: {},
      selectedIndex: -1,
    }
  }

  // Intial Function to get the wallet balance
  componentDidMount() {
    this.props.getBusinessDocList()
  }

  /**
   * Lifecycle  callback triggered after new props received
   * @param {Object} prevProps - refers props before updating component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.businessDocList !== this.props.businessDocList) {
      this.setState({ businessDocList: this.props.businessDocList })
    }
  }

  render() {
    // to access currnt state
    const { businessDocList, initialState } = this.state

    const validBusinessDoc =
      businessDocList !== null && businessDocList !== undefined && businessDocList.length !== 0

    return (
      <SafeAreaView style={styles.container}>
        <ToolBar testID={'ToolBar'} />
        <TitleView titleText={I18n.t('ONBOARDING_PROCESS')} testID={'TitleView'} />
        <Header
          testID={'Header'}
          titleText={I18n.t('UPLOAD_DOCUMENTS')}
          description={I18n.t('UPLOAD_DOCUMENT_DESC')}
        />
        <ScrollView testID={'scrollView'}>
          <View style={styles.documentMainContainer} testID={'documentContainer'}>
            {validBusinessDoc &&
              businessDocList.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      styles.documentContainer,
                      styles.viewBorderNill,
                      item.uploaded
                        ? styles.viewSuccessBorder
                        : !initialState
                        ? !item.uploaded
                          ? styles.viewDangerBorder
                          : styles.viewSuccessBorder
                        : {},
                    ]}
                  >
                    <Text
                      style={[
                        styles.documentText,
                        styles.documentTextNill,
                        item.uploaded
                          ? styles.documentTextSuccess
                          : !initialState
                          ? !item.uploaded
                            ? styles.documentTextDanger
                            : styles.documentTextSuccess
                          : {},
                      ]}
                    >
                      {item.label}
                    </Text>
                    {!item.uploaded && (
                      <TouchableOpacity onPress={this.pickDoc.bind(this, item, i)}>
                        <UploadImage
                          width={styles.uploadImageStyle.width}
                          height={styles.uploadImageStyle.height}
                        />
                      </TouchableOpacity>
                    )}
                    {item.uploaded && (
                      <CircleChecked
                        width={styles.uploadImageStyle.width}
                        height={styles.uploadImageStyle.height}
                      />
                    )}
                    <TouchableOpacity onPress={this.showToolTip.bind(this, item.type)}>
                      <Info
                        width={styles.uploadImageStyle.width}
                        height={styles.uploadImageStyle.height}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}
            {validBusinessDoc && (
              <View style={styles.buttonContainer}>
                <Button
                  testID={'continue'}
                  text={I18n.t('CONTINUE_BUTTON')}
                  withShadow={true}
                  withBg={true}
                  onClick={this.submitInformation}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  /**
   * show tooltip of the particular item, to know about that document
   * @param {String} type user selected type
   */
  showToolTip = (type) => {
    switch (type) {
      case DefaultStrings.TYPE_BANK_STATEMENT:
        businessDocAlert(I18n.t('BANK_STATEMENT'), I18n.t('BANK_STATEMENT_DESC'))
        break
      case DefaultStrings.TYPE_POA:
        businessDocAlert(I18n.t('PROOF_OF_ADDRESS'), I18n.t('PROOF_OF_ADDRESS_DESC'))
        break
      case DefaultStrings.TYPE_ARTICLES:
        businessDocAlert(I18n.t('ARCTICLES_OF_INCORP'), I18n.t('ARTICLE_OF_INCORP_DESC'))
        break
      case DefaultStrings.TYPE_TAX_ID:
        businessDocAlert(I18n.t('TAX_ID_COMPANY_CODE'), I18n.t('TAX_ID_COMPANY_CODE_DESC'))
        break
      case DefaultStrings.TYPE_INCOMETAX:
        businessDocAlert(I18n.t('LAST_INCOME_TAX'), I18n.t('LAST_INCOME_TAX_DESC'))
        break
      case DefaultStrings.TYPE_DBA:
        businessDocAlert(I18n.t('DBA'), I18n.t('DBA_DESC'))
        break
    }
  }

  /**
   *upload the user selected document data to API
   * @param {String} base64Data
   */
  uploadDocToAPI(base64Data) {
    const { selectedItem } = this.state
    const documentData = {
      document: base64Data,
      type: selectedItem.type,
    }
    this.props.submitBusinessDocuments(documentData, this.uploadDocCallback)
  }

  uploadDocCallback = () => {
    let documentList = this.state.businessDocList
    const { selectedIndex } = this.state
    documentList[selectedIndex].uploaded = true
    this.setState({
      documentList: documentList,
    })
  }

  /**
   * open the filemanager to pick the Documents
   * @param {*} item user selected Item
   * @param {number} index user selected item index
   */
  pickDoc = (item, index) => {
    this.setState({
      selectedItem: item,
      selectedIndex: index,
    })

    if (Platform.OS === 'ios') {
      return this.pickIOS()
    }
    return new Promise((resolve, reject) => {
      return this.pickDocument(resolve, reject)
    })
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
      if (!(response.didCancel && response.error && response.customButton)) {
        const { data: b64Content, type: fileType } = response // response data whick user selected image
        const b64 = `data:${fileType};base64,${b64Content}` // Base64 data of user selected image
        const fileExtension = String(fileType).substr(String(fileType).indexOf('/') + 1) // user selected image file extension
        this.uploadDocToAPI(b64)
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
    const b64 = `data:${fileType};base64,${b64Content}` // Base64 data of user selected image
    this.uploadDocToAPI(b64)
    resolve({ b64, fileType, fileExtension })
  }

  /**
   * close the filemanager picker popup
   */
  pickClosed = (_, reject) => {
    reject(new Error('Action cancelled!')) // reject action and Log the Action
  }

  // check all Inputs and navigate to PhoneverificationScreen
  submitInformation = () => {
    let isNotAllUploaded = true
    this.state.businessDocList.map((item, i) => {
      if (!item.uploaded) isNotAllUploaded = false
    })
    this.setState({ initialState: isNotAllUploaded })
    if (isNotAllUploaded) {
      Navigator.navigate(NavKeys.SECURITY_OPTIONS_FROM_ONBOARD, { isFromOnBoarding: true })
    }
  }
}
UploadDocumentsScreen.propTypes = {
  getBusinessDocument: PropTypes.array,
  businessDocumentIsLoading: PropTypes.bool,
  submitBusinessDocumentByType: PropTypes.func,
  submitBusinessDocuments: PropTypes.func,
  getBusinessDocList: PropTypes.func,
  businessDocList: PropTypes.array,
}

// Get State from redux store
export const mapStateToProps = (state) => ({
  businessDocList: state.signUp.getBusinessDocument,
  businessDocSuccess: state.signUp.submitBusinessDocumentByType,
})

// Dispatch action via props
export const mapDispatchToProps = (dispatch) => ({
  getBusinessDocList: () => dispatch(SignupActions.getBusinessDocuments()),
  submitBusinessDocuments: (documentData, successFn) =>
    dispatch(SignupActions.submitBusinessDocument(documentData, successFn)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocumentsScreen)

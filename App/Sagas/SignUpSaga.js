import { put, call, select } from 'redux-saga/effects'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { ApiService } from 'App/Services/ApiService'
import { UserService } from 'App/Services/UserService'
import SignUpActions from 'App/Stores/SignUp/Actions'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import {
  renameObjectKey,
  renameProvinceObjectKey,
  showAlert,
  renameDocumentObjectKey,
  between,
} from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import CommonActions from 'App/Stores/Common/Actions'
import I18n from 'App/Localization/I18n'

// Parse token from store
export const getToken = (state) => state.user.token

/**
 * sign up call
 * @param {Object} data contains the request informations to hit API service call
 */
export function* signUp(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Check Network status
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  // Trigger signup API
  const signUp = yield call(ApiService.postApi, ApiEndPoints.SIGN_UP, data.signUpData)

  yield put(CommonActions.showOrHideLoader(false))
  if (signUp.status === 200) {
    // After signup success navigate to Thanks screen
    Navigator.navigateAndReset(NavKeys.SIGN_UP_THANKS)
  } else {
    // if status code is not 200 process signUp failure with message
    // Show error message
    signUp && signUp.data && signUp.data.message
      ? showAlert(signUp.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get documents list
 */
export function* getUserDocuments() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Check Network status
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  const token = yield select(getToken)
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  // Fetch document informations from an API
  const documentList = yield call(ApiService.getApi, ApiEndPoints.GET_DOCUMENTS, token)

  yield put(CommonActions.showOrHideLoader(false))
  if (documentList.status === 200) {
    const documentData = renameDocumentObjectKey(documentList.data.data)
    yield put(SignUpActions.setUserDocuments(documentData))
  } else {
    // if status code is not 200 process document list failure with message
    documentList && documentList.data && documentList.data.message
      ? showAlert(documentList.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get country list
 */
export function* getCountryList(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Check Network status
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  // Fetch user informations from an API
  const countryObject = yield call(ApiService.getApi, ApiEndPoints.COUNTRY)

  yield put(CommonActions.showOrHideLoader(false))
  if (countryObject.status === 200) {
    const countrylist = renameObjectKey(countryObject.data.data)
    yield put(SignUpActions.setCountryList(countrylist))
    yield call(data.successFn, countrylist)
  } else {
    // if status code is not 200 process signUp failure with message
    countryObject && countryObject.data && countryObject.data.message
      ? showAlert(countryObject.data.message)
      : countryObject.message
      ? showAlert(countryObject.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get Provence list
 */
export function* getProvinceList(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // get Province list from an API
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  yield put(CommonActions.showOrHideLoader(true))
  const response = yield call(ApiService.getApi, ApiEndPoints.PROVINCES + '/' + data.counrtryIso)
  yield put(CommonActions.showOrHideLoader(false))
  if (response.status === 200) {
    const provinceList = renameProvinceObjectKey(response.data.data.provinces)
    yield put(SignUpActions.setProvinceList(provinceList))
    yield call(data.successFn, provinceList)
  } else {
    // if status code is not 200 process signUp failure with message
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : response.message
      ? showAlert(response.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 *
 * @param {Object} token contains the token to hit API service call
 */
export function* userVerification(token) {
  // Fetch user informations from an API
  const userVerification = yield call(ApiService.getApi, ApiEndPoints.VERIFICATION, token)

  if (userVerification.status === 200) {
    // if status code is 200 process signUp success function
    yield put(SignUpActions.verificationSuccess(userVerification))
    // After signup success navigate to dashboard
    setTimeout(() => {
      Navigator.navigate(NavKeys.SIGN_UP_ACCOUNT_PROGRESS)
    }, 2000)
  } else {
    // if status code is not 200 process signUp failure with message
    yield put(SignUpActions.verificationFailure(userVerification.message))

    userVerification && userVerification.data && userVerification.data.message
      ? showAlert(userVerification.data.message)
      : userVerification.message
      ? showAlert(userVerification.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

// get businessDocuments list by user
export function* getBusinessDocuments() {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  const token = yield select(getToken)
  yield put(CommonActions.showOrHideLoader(true))
  const businessDocuments = yield call(
    ApiService.getApi,
    ApiEndPoints.GET_BUSINESS_DOC_STATUS,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(businessDocuments.status, 200, 204)) {
    // if status code is 200 process businessDocument success function
    yield put(SignUpActions.businessDocumentSuccess(businessDocuments.data.data))
  } else {
    // if status code is not 200 process businessDocument failure function
    yield put(SignUpActions.businessDocumentFailure(businessDocuments))
  }
}

// get businessDocuments list by user
export function* uploadBusinessDocByType(documentData) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  yield put(CommonActions.showOrHideLoader(true))
  const businessDocuments = yield call(
    ApiService.postApi,
    ApiEndPoints.UPLOAD_BUSINESS_DOC,
    documentData.documentData
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(businessDocuments.status, 200, 204)) {
    // if status code is 200 process businessDocument success function
    yield put(SignUpActions.submitBusinessDocumentSuccess(businessDocuments.data))
    yield call(documentData.successFn, {})
  } else {
    // if status code is not 200 process businessDocument failure function
    yield put(SignUpActions.submitBusinessDocumentFailure(businessDocuments))
    businessDocuments && businessDocuments.data && businessDocuments.data.message
      ? showAlert(businessDocuments.data.message)
      : businessDocuments.message
      ? showAlert(businessDocuments.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * request forgot password email
 * @param {Object} data contains the request informations to hit API service call
 */
export function* resetPassword(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))

    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.PASSWORD + '/' + data.reqData.token,
      data.reqData
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.message)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * resetPassword
 * @param {Object} data contains the request informations to hit API service call
 */
export function* reqForgotPassEmail(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))

    const response = yield call(ApiService.postApi, ApiEndPoints.PASSWORD, data.reqData)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.message)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * getBusinessCategory
 * @param {Object} data contains the request informations to hit API service call
 */
export function* getBusinessCategory(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)

    const response = yield call(ApiService.getApi, ApiEndPoints.BUSINESS_CATEGORIES, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * update businessInfo
 * @param {Object} data contains the request informations to hit API service call
 */
export function* updateBusinessInfo(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)

    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.UPDATE_BUSINESS_INFO,
      data.businessData,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // Send call back
      yield call(data.successFn, response.data.message)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * get Onfido SDK token
 */
export function* getOnfidoToken(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Check Network status
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  // Show loader
  yield put(CommonActions.showOrHideLoader(true))
  // Fetch user informations from an API
  const resultObject = yield call(ApiService.getApi, ApiEndPoints.ONFIDO_TOKEN)

  yield put(CommonActions.showOrHideLoader(false))
  if (resultObject.status === 200) {
    yield call(data.successFn, resultObject.data.data)
  } else {
    // if status code is not 200 process signUp failure with message
    resultObject && resultObject.data && resultObject.data.message
      ? showAlert(resultObject.data.message)
      : resultObject.message
      ? showAlert(resultObject.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 *
 * @param {Object} data contains the request informations to hit API service call
 */
export function* otpValidationWithCallback(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Trigger otp validation API
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  const apiResponse = yield call(UserService.phoneVerification, data.otpData, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (apiResponse.status === 200) {
    // After success otp verification, navigate to validation success
    if (data.otpData.isSignup) {
      yield Navigator.navigate(NavKeys.PHONE_VALIDATION_SUCCESS)
    } else yield call(data.successFn, {})
  } else {
    // if status code is not 200 process failure with message
    apiResponse && apiResponse.data && apiResponse.data.message
      ? showAlert(apiResponse.data.message)
      : apiResponse.message
      ? showAlert(apiResponse.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * onfido check
 * @param {Object} data refers request data to trigger api call
 */
export function* onfidoCheck(data) {
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  const response = yield call(ApiService.getApi, ApiEndPoints.ONFIDO_CHECK, token)
  if (between(response.status, 200, 204)) {
    // if status code is 200 process with success data
    yield call(data.successFn, response.data)
  } else {
    // if status code is not 200 process with failure message
    response && response.data && response.data.message
      ? showAlert(response.data.message)
      : response.message
      ? showAlert(response.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 *
 * @param {Object} data.userData contains the request informations to hit API service call
 */
export function* updateUserInformation(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CommonActions.showOrHideLoader(true))

  // Trigger user information API
  const token = yield select(getToken)
  const apiResponse = yield call(UserService.updateUserInformation, data.userData, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (apiResponse.status === 200) {
    // After update success navigate otp verification
    if (data.userData.isUpdate) yield call(data.successFn, apiResponse.data.message)
    else
      Navigator.navigate(NavKeys.PHONE_VALIDATION, {
        phoneNumber: data.userData.phonenumber,
      })
  } else {
    // if status code is not 200 process failure with message
    // Show error message
    apiResponse && apiResponse.data && apiResponse.data.message
      ? showAlert(apiResponse.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 *
 * @param {Object} data.phoneData contains the request informations to hit API service call
 */
export function* validateOtp(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Trigger user information API
  const token = yield select(getToken)
  yield put(CommonActions.showOrHideLoader(true))
  const apiResponse = yield call(UserService.phoneVerification, data.phoneData, token)
  yield put(CommonActions.showOrHideLoader(false))
  if (apiResponse.status === 200) {
    // After success otp verification, clear onBoardingProfile and navigate to validation success
    if (!data.phoneData.resend) {
      // yield put(UserActions.setOnBoardingProfile({}))
      yield Navigator.navigate(NavKeys.PHONE_VALIDATION_SUCCESS)
    }
  } else {
    // if status code is not 200 process failure with message
    // Show error message``
    apiResponse && apiResponse.data && apiResponse.data.message
      ? showAlert(apiResponse.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

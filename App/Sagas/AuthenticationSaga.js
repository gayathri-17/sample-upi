import { put, call, select } from 'redux-saga/effects'
import { ApiService } from 'App/Services/ApiService'
import UserActions from 'App/Stores/User/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/**
 * post tfa verification token and code
 * @param {Object} reqData contains the request informations to hit API service call
 */
export function* postTfaVerification(reqData) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Trigger user information API
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  const tfaResponse = yield call(ApiService.postApi, ApiEndPoints.TFA, reqData.tfaData, token)
  yield put(CommonActions.showOrHideLoader(false))

  if (between(tfaResponse.status, 200, 204)) {
    yield call(reqData.successFn, tfaResponse.data)
  } else {
    // if status code is not 200 process failure with message
    tfaResponse && tfaResponse.data && tfaResponse.data.message
      ? showAlert(tfaResponse.data.message)
      : tfaResponse.message
      ? showAlert(tfaResponse.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get tfa verification token
 * @param {Object} reqData contains the request informations to hit API service call
 */
export function* getTfaVerificationToken(reqData) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Trigger user information API
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  yield put(CommonActions.showOrHideLoader(true))
  const token = yield select(getToken)
  const genarateSecresResponse = yield call(ApiService.getApi, ApiEndPoints.TFA, token)
  yield put(CommonActions.showOrHideLoader(false))

  if (between(genarateSecresResponse.status, 200, 204)) {
    yield call(reqData.successFn, genarateSecresResponse.data)
  } else {
    // if status code is not 200 process failure with message
    genarateSecresResponse && genarateSecresResponse.data && genarateSecresResponse.data.message
      ? showAlert(genarateSecresResponse.data.message)
      : genarateSecresResponse.message
      ? showAlert(genarateSecresResponse.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * process transaction
 * @param {Object} data contains the request informations to hit API service call
 */
export function* processTransaction(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.getApi, ApiEndPoints.PROCESS_TRANSACTION, token)
    if (response.status === 200 || response.status === 201 || response.status === 500) {
      // Send call back
      yield call(data.successFn, response.data.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      yield call(data.failureFn)
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
    }
  } else {
    yield call(data.failureFn)
  }
}

/**
 * resend sms
 * @param {Object} data contains the request informations to hit API service call
 */
export function* resend(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.getApi, ApiEndPoints.RESEND + data.data, token)
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * cancel transaction
 */
export function* cancelTransaction() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.getApi, ApiEndPoints.CANCEL_TRANSACTION, token)
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
    }
  } else {
  }
}

/**
 * tfa change request
 * @param {Object} data contains the request informations to hit API service call
 */
export function* tfaChangeRequest(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.TFA_CHANGE_REQUEST,
      data.data,
      token
    )
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
      yield call(data.failureFn)
    }
  } else {
    yield call(data.failureFn)
  }
}

/**
 * tfa change confirm
 * @param {Object} data contains the request informations to hit API service call
 */
export function* tfaChangeConfirm(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.TFA_CHANGE_CONFIRM,
      data.data,
      token
    )
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield put(CommonActions.showOrHideLoader(false))
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * post security method
 * @param {Object} data contains the request informations to hit API service call
 */
export function* postSecurityMethods(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.postApi, ApiEndPoints.SECURITY, data.data, token)
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(data.failureFn)
      yield put(CommonActions.showOrHideLoader(false))
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    yield call(data.failureFn)
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * delete security methids
 * @param {Object} data contains the request informations to hit API service call
 */
export function* deleteSecurityMethods(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(
      ApiService.deleteApi,
      ApiEndPoints.SECURITY + data.data.method,
      token
    )
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(data.failureFn)
      yield put(CommonActions.showOrHideLoader(false))
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    yield call(data.failureFn)
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/**
 * check transaction
 * @param {Object} data contains the request informations to hit API service call
 */
export function* checktx(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    // get contact api request
    const response = yield call(ApiService.getApi, ApiEndPoints.CHECK_KTX, token)
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data.data)
    } else {
      yield call(data.failureFn)
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
    }
  } else {
    yield call(data.failureFn)
  }
}

/** sms verification
 * @param {Object} data contains the request informations to hit API service call
 */
export function* submitSmsVerification(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(
      ApiService.getApi,
      ApiEndPoints.SECURITY_CALL + data.method + '/' + data.uuid + '/' + data.code,
      token
    )

    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(data.failureFn)
      yield put(CommonActions.showOrHideLoader(false))
    }
  } else {
    yield call(data.failureFn)
  }
}

/** Change password
 * @param {Object} data contains the request informations to hit API service call
 */
export function* changePassword(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.postApi, ApiEndPoints.CHANGE_PASSWORD, data.data, token)
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data)
      yield put(CommonActions.showOrHideLoader(false))
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      response && response.data && response.data.message
        ? showAlert(response.data.message)
        : showAlert(I18n.t('TRY_AGAIN_LATER'))
      yield put(CommonActions.showOrHideLoader(false))
    }
  } else {
    showAlert(I18n.t('NETWORK_ERROR'))
  }
}

/** get Security methods
 * @param {Object} data contains the request informations to hit API service call
 */
export function* getSecurityMethods(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)

    yield put(CommonActions.showOrHideLoader(true))
    // transfer balance api request
    const response = yield call(ApiService.getApi, ApiEndPoints.SECURITY, token)

    if (response.status === 200) {
      // Send call back
      yield put(CommonActions.showOrHideLoader(false))
      yield put(UserActions.setSecurityMethods(response.data.data))
      yield call(data.successFn, response.data.data)
    } else {
      yield put(CommonActions.showOrHideLoader(false))
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

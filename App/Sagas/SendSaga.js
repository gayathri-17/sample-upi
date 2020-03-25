import { put, call, select } from 'redux-saga/effects'
import { ApiService } from 'App/Services/ApiService'
import CommonActions from 'App/Stores/Common/Actions'
import Navigator from 'App/Services/NavigationService'
import NavKeys from 'App/Constants/NavKeys'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { between, getErrorByCode } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import DefaultStrings from 'App/Constants/DefaultStrings'
import { getToken } from './UserSaga'

/** transfer transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* transferTransactionProgress(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)
    // transfer balance api request
    const response = yield call(ApiService.postApi, ApiEndPoints.WITHDRAW, data.data, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // store data in reducers
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(
        data.failureFn,
        response && response.data && response.data.message
          ? getErrorByCode(response.data.code, response.data.message)
          : ''
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

/** transfer transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* confirmBankTransfer(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)
    const confirmSendRes = yield call(
      ApiService.getApi,
      ApiEndPoints.CONFIRM_WITHDRAW + '/' + data.data.hash,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(confirmSendRes.status, 200, 204)) {
      // Send call back
      if (confirmSendRes.data.message.toUpperCase().includes(DefaultStrings.INCLUDES_SECURITY)) {
        Navigator.navigate(NavKeys.SEND_AUTHENTICATION_SCREEN, {
          security: confirmSendRes.data.data.methods,
          hashKey: data.data.hash,
        })
      } else {
        Navigator.navigate(NavKeys.TRANSACTION_SUCCESS)
      }
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback

      yield call(
        data.failureFn,
        confirmSendRes &&
          confirmSendRes.data &&
          confirmSendRes.data.message &&
          confirmSendRes.data.message
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

/** transfer to conact transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* contactTransferTransactionProgress(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    // transfer balance api request
    yield put(CommonActions.showOrHideLoader(true))
    const response = yield call(ApiService.postApi, ApiEndPoints.TRANSFER_USD, data.data, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(
        data.failureFn,
        response && response.data && response.data.message
          ? getErrorByCode(response.data.code, response.data.message)
          : ''
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

/** transfer to conact transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* confirmContactTransfer(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    yield put(CommonActions.showOrHideLoader(true))
    // transfer balance api request
    const confirmSendRes = yield call(
      ApiService.postApi,
      ApiEndPoints.FIAT_WITHDRAW,
      data.data,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(confirmSendRes.status, 200, 204)) {
      // Send call back
      if (confirmSendRes.data.message.toUpperCase().includes(DefaultStrings.INCLUDES_SECURITY)) {
        Navigator.navigate(NavKeys.SEND_AUTHENTICATION_SCREEN, {
          security: confirmSendRes.data.data.methods,
          hashKey: data.data.hash,
        })
      } else {
        Navigator.navigate(NavKeys.TRANSACTION_SUCCESS)
      }
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(
        data.failureFn,
        confirmSendRes &&
          confirmSendRes.data &&
          confirmSendRes.data.message &&
          confirmSendRes.data.message
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

/** transfer transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* transferCryptoProgress(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)
    // transfer balance api request
    const response = yield call(
      ApiService.postApi,
      ApiEndPoints.TRANSFR_CRYPTO + data.currency,
      data.data,
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(response.status, 200, 204)) {
      // store data in reducers
      yield call(data.successFn, response.data.data)
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(
        data.failureFn,
        response && response.data && response.data.message
          ? getErrorByCode(response.data.code, response.data.message)
          : ''
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

/** transfer transaction progress
 * @param {Object} data contains the request informations to hit API service call
 */
export function* confirmCryptoTransfer(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    yield put(CommonActions.showOrHideLoader(true))
    const token = yield select(getToken)
    const confirmSendRes = yield call(
      ApiService.postApi,
      ApiEndPoints.TRANSFER_CRYPTO_CONFIRM + '/' + data.data.hash,
      { comment: data.data.comment },
      token
    )
    yield put(CommonActions.showOrHideLoader(false))
    if (between(confirmSendRes.status, 200, 204)) {
      // Send call back
      if (confirmSendRes.data.message.toUpperCase().includes(DefaultStrings.INCLUDES_SECURITY)) {
        Navigator.navigate(NavKeys.SEND_AUTHENTICATION_SCREEN, {
          security: confirmSendRes.data.data.methods,
          hashKey: data.data.hash,
        })
      } else {
        Navigator.navigate(NavKeys.TRANSACTION_SUCCESS)
      }
    } else {
      // if status code is not 200 process request failure with message
      // Error handling - trigger callback
      yield call(
        data.failureFn,
        confirmSendRes &&
          confirmSendRes.data &&
          confirmSendRes.data.message &&
          confirmSendRes.data.message
      )
    }
  } else {
    yield call(data.failureFn, '')
  }
}

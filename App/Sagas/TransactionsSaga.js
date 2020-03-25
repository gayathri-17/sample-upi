import { put, call, select } from 'redux-saga/effects'
import UserActions from 'App/Stores/User/Actions'
import { UserService } from 'App/Services/UserService'
import { ApiService } from 'App/Services/ApiService'
import WalletActions from 'App/Stores/WalletBalance/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between } from 'App/Components/Utils/Functions'
import handleConnectivityStatus from 'App/Services/NetworkService'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/**
 * Transaction detail saga
 * @param {String} operationType refers the operation type in selected transaction list
 * @param {String} id refers id in selected transaction list
 */
export function* getTransactionDetail(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  yield put(CommonActions.showOrHideLoader(true))
  const transactionDetail = yield call(
    UserService.getTransactionDetail,
    data.operationType,
    data.id,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(transactionDetail.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield put(WalletActions.transactionDetailSuccess(transactionDetail.data.data))
  } else {
    // if status code is not 200 process transaction detail with failure message
    transactionDetail && transactionDetail.data && transactionDetail.data.message
      ? showAlert(transactionDetail.data.message)
      : transactionDetail.message
      ? showAlert(transactionDetail.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get statements list based on from date and to  date
 * @param {Object} reqData contains the request informations to hit API service call
 */
export function* getStatementsList(reqData) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  // Trigger user information API
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  if (reqData.isLoader) {
    yield put(CommonActions.showOrHideLoader(true))
  }
  const token = yield select(getToken)
  const transactionResponse = yield call(
    ApiService.postApi,
    ApiEndPoints.TRANSACTIONS,
    reqData.data,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))

  if (between(transactionResponse.status, 200, 204)) {
    yield call(reqData.successFn, transactionResponse.data)
    yield put(UserActions.setTransactionList(transactionResponse.data.data))
  } else {
    // if status code is not 200 process failure with message
    transactionResponse && transactionResponse.data && transactionResponse.data.message
      ? showAlert(transactionResponse.data.message)
      : transactionResponse.message
      ? showAlert(transactionResponse.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * get monthly transaction list
 * @param {Object} reqData contains the request informations to hit API service call
 */
export function* getMonthlyTransactionList(reqData) {
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
  const transactionResponse = yield call(
    ApiService.getApi,
    ApiEndPoints.STATEMENTS + reqData.month + '/' + reqData.year,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(transactionResponse.status, 200, 204)) {
    yield call(reqData.successFn, transactionResponse.data.data)
  } else {
    // if status code is not 200 process failure with message
    transactionResponse && transactionResponse.data && transactionResponse.data.message
      ? showAlert(transactionResponse.data.message)
      : transactionResponse.message
      ? showAlert(transactionResponse.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * monthly transaction detail saga
 * @param {Object} data refers request data to trigger api call
 */
export function* getMonthlyTransactionDetail(data) {
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (!networkStatus) {
    showAlert(I18n.t('NETWORK_ERROR'))
    return
  }
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  yield put(CommonActions.showOrHideLoader(true))
  const transactionDetail = yield call(
    UserService.getTransactionDetail,
    data.operationType,
    data.id,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(transactionDetail.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield call(data.successFn, transactionDetail.data.data)
  } else {
    // if status code is not 200 process transaction detail with failure message
    transactionDetail && transactionDetail.data && transactionDetail.data.message
      ? showAlert(transactionDetail.data.message)
      : transactionDetail.message
      ? showAlert(transactionDetail.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

/**
 * update wallet alias
 * @param {Object} data contains the request informations to hit API service call
 */
export function* updateWallet(data) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  const networkStatus = yield call(handleConnectivityStatus, {})
  if (networkStatus) {
    const token = yield select(getToken)
    yield put(CommonActions.showOrHideLoader(true))
    // get contact api request
    const response = yield call(ApiService.postApi, ApiEndPoints.GET_BALANCE, data.data, token)
    yield put(CommonActions.showOrHideLoader(false))
    if (response.status === 200 || response.status === 201) {
      // Send call back
      yield call(data.successFn, response.data.data)
    } else {
      response && response.data && response.data.message
        ? yield call(data.failureFn, response.data.message)
        : yield call(data.failureFn, I18n.t('TRY_AGAIN_LATER'))
    }
  } else {
    yield call(data.failureFn, I18n.t('NETWORK_ERROR'))
  }
}

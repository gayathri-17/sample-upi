import { put, call, select } from 'redux-saga/effects'
import { ApiService } from 'App/Services/ApiService'
import CommonActions from 'App/Stores/Common/Actions'
import ApiEndPoints from 'App/Constants/ApiEndPoints'
import { showAlert, between, showErrorByCode } from 'App/Components/Utils/Functions'
import I18n from 'App/Localization/I18n'
import { getToken } from './UserSaga'

/**
 * confirm buy sell
 * @param {Object} data refers request data to trigger api call
 */
export function* confirmBuySell(data) {
  const token = yield select(getToken)
  yield put(CommonActions.showOrHideLoader(true))
  // Fetch transaction detail from an API
  const response = yield call(
    ApiService.getApi,
    data.selectedType + '/' + ApiEndPoints.CONFIRM + '/' + data.hash,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield call(data.successFn, response.data)
  } else {
    // if status code is not 200 process transaction detail with failure message
    yield call(data.failureFn, response)
  }
}

/**
 * get buy sell hash
 * @param {Object} data refers request data to trigger api call
 */
export function* getBuySellHash(data) {
  const token = yield select(getToken)
  // Fetch transaction detail from an API
  yield put(CommonActions.showOrHideLoader(true))
  const response = yield call(
    ApiService.postApi,
    data.selectedType + '/' + data.currency,
    data.data,
    token
  )
  yield put(CommonActions.showOrHideLoader(false))
  if (between(response.status, 200, 204)) {
    // if status code is 200 process transaction detail with success data
    yield call(data.successFn, response.data.data)
  } else {
    // if status code is not 200 process transaction detail with failure message
    response && response.data
      ? showErrorByCode(response.data.code, response.data.message)
      : showAlert(I18n.t('TRY_AGAIN_LATER'))
  }
}

import { create } from 'apisauce'
import { Config } from 'App/Config'

const userApiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // need to add User Token here which is get from Login API
    Authorization: '',
  },
  timeout: 10000,
})

/**
 *
 * @param {Object} loginData contains the request informations to hit API service call
 * @returns {Object} api response
 */
function login(loginData) {
  return userApiClient.post('/login', loginData)
}

/**
 *
 * @returns {Object} wallet balance response
 */
function walletBalance(token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.get('/balance')
}

/**
 *
 * @returns {Array} transaction list response
 */
function getTransactionList(token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.get('/transaction/recent')
}

/**
 * get user profile info from API
 * @returns {Object} api response
 */
function getProfile(token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.get('/whois')
}

/**
 * update user infor API call
 * @param {Object} userData contains the request informations to hit API service call
 * @returns {Object} api response
 */
function updateUserInformation(userData, token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.post('/signup/userinformation', userData)
}

/**
 * phone verification API call
 * @param {Object} phoneData contains the request informations to hit API service call
 * @returns {Object} api response
 */
function phoneVerification(phoneData, token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.post('/signup/phoneverification', phoneData)
}

/**
 * @returns {Object} transaction detail response
 */
function getTransactionDetail(operation, id, token) {
  userApiClient.setHeader('Authorization', 'Bearer ' + token)
  return userApiClient.get('/transaction/' + operation + '/' + id)
}

export const UserService = {
  login,
  walletBalance,
  getTransactionList,
  getProfile,
  updateUserInformation,
  phoneVerification,
  getTransactionDetail,
}

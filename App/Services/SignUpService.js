import { Config } from 'App/Config'
import { create } from 'apisauce'

const userApiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Get country lsit from server
function getCountryList() {
  return userApiClient.get('country')
}

// Get Province lsit from server
function getProvinceList(counrtryIso) {
  return userApiClient.get('provinces/' + counrtryIso)
}

/**
 *
 * @param {Object} signUpData contains the request informations to hit API service call
 * @returns {Object} api response
 */
function signUp(signUpData) {
  return userApiClient.post('/signup', signUpData)
}

// Fetch User Business documant list
function getBusinessDocuments() {
  return userApiClient.get('/signup/document_business/status').then((response) => {
    if (response.ok) {
      return response.data
    } else {
      return response.message
    }
  })
}

/**
 *
 * @param {Object} documentData contains the request informations to hit API service call
 * @returns {Object} api response
 */
function uploadBusinessDocByType(documentData) {
  return userApiClient.post('/signup/document_business', documentData).then((response) => {
    if (response.ok) {
      return response.data
    } else {
      return response.message
    }
  })
}

export const SignUpService = {
  signUp,
  getCountryList,
  getProvinceList,
  getBusinessDocuments,
  uploadBusinessDocByType,
}

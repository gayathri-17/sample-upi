import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * SignUp actions are defined here
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */

const { Types, Creators } = createActions({
  // Get country list - Api
  getCountryList: ['successFn'],
  // Set country lkist
  setCountryList: ['countryList'],
  // Get provinces list based on country selection from API
  getProvinceList: ['counrtryIso', 'successFn'],
  // Get provinces list based on country selection from API
  setProvinceList: ['provinceList'],
  // SignUp - Api
  signUp: ['signUpData'],
  // verfication
  userVerification: [],
  // User verified via mail was successfully
  verificationSuccess: ['verification'],
  // An error occurred while verification
  verificationFailure: ['errorMessage'],

  // get Business Documents
  getBusinessDocuments: [],
  // user document fetched successfully
  businessDocumentSuccess: ['businessDocuments'],
  // An error occureduser document fetching
  businessDocumentFailure: ['errorMessage'],

  // submit user BusinessDocument by type
  submitBusinessDocument: ['documentData', 'successFn'],
  // user document submitted successfully
  submitBusinessDocumentSuccess: ['submitBusinessDocument'],
  // An error occureduser document uploading
  submitBusinessDocumentFailure: ['errorMessage'],
  // get user documents
  getUserDocuments: [],
  // set user documents
  setUserDocuments: ['documents'],
  // forgot password requestEmail
  reqForgotPassEmail: ['reqData', 'successFn'],
  // resetPassword
  resetPassword: ['reqData', 'successFn'],
  // business category
  getBusinessCategory: ['successFn'],
  // update business Info
  updateBusinessInfo: ['businessData', 'successFn'],

  // Get Onfido Token - Api
  getOnfidoToken: ['successFn'],
})

export const SignUpActions = Types
export default Creators

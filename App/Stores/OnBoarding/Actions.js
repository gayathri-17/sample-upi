import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * on boarding actions are defined here
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */

const { Types, Creators } = createActions({
  // submit user information
  submitUserInformation: [],
  // User informations were successfully submitted
  submitUserInformationSuccess: ['userInformation'],
  // An error occurred
  submitUserInformationFailure: ['errorMessage'],
  // phone number verification
  phoneNumberValidation: [],
  // otp validated successfully
  phoneNumberValidationSuccess: ['phoneInformation'],
  // An error occurred in otp validation
  phoneNumberValidationFailure: ['errorMessage'],
})

export const OnBoardingActions = Types
export default Creators

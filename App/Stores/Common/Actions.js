import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Common actions are defined here
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */

const { Types, Creators } = createActions({
  // Show or hide loader
  showOrHideLoader: ['status'],

  // enable disable app notification
  enableDisableNotification: ['value'],
})

export const CommonTypes = Types
export default Creators

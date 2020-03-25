import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Telegram = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="20"
      fill="none"
      viewBox="0 0 25 20"
    >
      <path
        fill="#898989"
        d="M23.444.222a.641.641 0 00-.254.048L1.372 8.79a.707.707 0 00-.33.272.737.737 0 00.016.829c.085.12.204.21.34.257l5.06 1.757 3.05 6.278a.334.334 0 00.225.181.317.317 0 00.278-.07l2.858-2.492-3.192-2.487.25 3.265L7.62 11.7l12.193-7.525-10.149 9.14 7.902 6.16a1.395 1.395 0 001.346.22 1.43 1.43 0 00.586-.4c.16-.181.273-.4.33-.638l4.294-17.538A.742.742 0 0023.995.5a.707.707 0 00-.551-.279z"
      ></path>
    </svg>
	`
  return (
    <SvgXml
      xml={xml}
      width={props.width ? props.width : '100%'}
      height={props.height ? props.height : '100%'}
    />
  )
}
export default Telegram

Telegram.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

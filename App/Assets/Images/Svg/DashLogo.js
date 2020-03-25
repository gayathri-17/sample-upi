import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DashLogo = (props) => {
  const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 42 42"
    >
      <path
        fill="url(#paint0_linear)"
        d="M21 42c11.598 0 21-9.402 21-21S32.598 0 21 0 0 9.402 0 21s9.402 21 21 21z"
      ></path>
      <path
        fill="#fff"
        d="M23.904 12.711h-7.732l-.641 3.58 6.972.016c3.427 0 4.456 1.25 4.423 3.309-.017 1.063-.473 2.853-.675 3.427-.524 1.553-1.621 3.308-5.69 3.308h-6.786l-.641 3.58h7.715c2.717 0 3.882-.322 5.098-.879 2.718-1.249 4.338-3.933 4.98-7.427.962-5.217-.237-8.914-7.023-8.914z"
      ></path>
      <path
        fill="#fff"
        d="M12.83 19.515c-2.026 0-2.313 1.316-2.499 2.11-.253 1.046-.338 1.468-.338 1.468h7.918c2.025 0 2.312-1.317 2.498-2.11.253-1.047.338-1.468.338-1.468h-7.918z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="3.798"
          x2="38.211"
          y1="33.053"
          y2="8.956"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3AD1BF"></stop>
          <stop offset="1" stopColor="#119BD2"></stop>
        </linearGradient>
      </defs>
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
export default DashLogo

DashLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

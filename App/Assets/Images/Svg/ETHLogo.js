import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const ETHLogo = (props) => {
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
        d="M21.32 26.892v5.74l7.125-10.011-7.124 4.27zM28.174 20.764L21.322 9.369v8.289l6.853 3.106zM21.32 18.316v7.073l6.787-3.984-6.786-3.09zM13.86 20.764l6.853-11.395v8.289l-6.854 3.106zM20.712 18.316v7.073l-6.82-3.984 6.82-3.09zM20.696 26.892v5.74L13.572 22.62l7.124 4.27z"
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
          <stop stopColor="#8E70EE"></stop>
          <stop offset="1" stopColor="#2E84C1"></stop>
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
export default ETHLogo

ETHLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

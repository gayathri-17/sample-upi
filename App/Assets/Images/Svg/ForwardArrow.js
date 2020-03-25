import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const ForwardArrow = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        fill="#3AD1BF"
        fillRule="evenodd"
        d="M50 25C50 11.192 38.808 0 25 0S0 11.192 0 25s11.192 25 25 25 25-11.192 25-25zm-12.309 1.361l-8.78 8.781a1.92 1.92 0 01-2.72 0 1.92 1.92 0 010-2.72l5.51-5.509H13.453a1.923 1.923 0 110-3.846h18.225l-5.486-5.489a1.918 1.918 0 010-2.719 1.92 1.92 0 012.719 0l8.78 8.783a1.921 1.921 0 010 2.72z"
        clipRule="evenodd"
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
export default ForwardArrow

ForwardArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

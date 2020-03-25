import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CheckboxChecked = (props) => {
  const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <rect width="16" height="16" fill="#3AD1BF" rx="2"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 7.5L6.75 11l4.75-6"
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
export default CheckboxChecked

CheckboxChecked.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

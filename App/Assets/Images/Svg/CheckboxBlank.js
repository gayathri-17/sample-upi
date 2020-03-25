import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CheckboxBlank = (props) => {
  const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <rect
        width="15"
        height="15"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#C9D6DF"
        rx="1.5"
      ></rect>
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
export default CheckboxBlank

CheckboxBlank.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

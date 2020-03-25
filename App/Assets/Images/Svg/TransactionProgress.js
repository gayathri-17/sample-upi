import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const TransactionProgress = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="283"
  height="376"
  fill="none"
  viewBox="0 0 283 376"
>
  <path
    fill="#FDFDFD"
    d="M122.956 0l-22.248 19.727 37.08 42.05H59.993C10.847 61.776-29 101.622-29 150.77v81.577H.664V150.77c0-32.765 26.565-59.33 59.33-59.33h78.24l-37.081 42.05 22.248 19.727 67.709-76.609L122.956 0zM252.812 143.353v81.578c0 32.764-26.565 59.329-59.329 59.329h-78.24l37.081-42.049-22.249-19.728-67.709 76.609 68.08 76.608 22.248-19.727-37.08-42.049h77.869c49.146 0 88.993-39.847 88.993-88.993v-81.578h-29.664z"
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
export default TransactionProgress

TransactionProgress.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

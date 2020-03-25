import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DropDownArrowGrey = (props) => {
  const xml = `
    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6.5 6L12 1" stroke="#E1E2E6" stroke-width="2"/>
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
export default DropDownArrowGrey

DropDownArrowGrey.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

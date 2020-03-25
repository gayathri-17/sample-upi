import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DropDownArrow = (props) => {
  const xml = `
    <svg 
        width="12" 
        height="6" 
        viewBox="0 0 12 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
    <path 
        d="M12 0H0L5.71429 6L12 0Z" 
        fill="#3AD1BF"/>
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
export default DropDownArrow

DropDownArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

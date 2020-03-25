import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const UpArrow = (props) => {
  const xml = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="8"
        fill="none"
        viewBox="0 0 13 8"
      >
        <path stroke="#3AD1BF" strokeWidth="2" d="M12 7L6.5 2 1 7"></path>
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
export default UpArrow

UpArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

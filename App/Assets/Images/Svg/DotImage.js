import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DotImage = (props) => {
  const xml = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="7"
        fill="none"
        viewBox="0 0 7 7"
        >
        <circle cx="3.5" cy="3.5" r="3.5" fill="#3AD1BF"></circle>
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
export default DotImage

DotImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

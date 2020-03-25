import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DropDownGray = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="8"
      fill="none"
      viewBox="0 0 13 8"
    >
      <path stroke="#E1E2E6" strokeWidth="2" d="M1 1l5.5 5L12 1"></path>
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
export default DropDownGray

DropDownGray.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

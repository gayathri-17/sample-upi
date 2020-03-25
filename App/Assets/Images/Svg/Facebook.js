import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Facebook = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="22"
      fill="none"
      viewBox="0 0 11 22"
    >
      <path
        fill="#898989"
        fillRule="evenodd"
        d="M8.153 3.845h1.992V.214c-.362 0-.724 0-.905-.214H7.429c-.905 0-1.81.214-2.535.854-.905.641-1.268 1.71-1.449 2.99 0 .428-.18 1.069-.18 1.496v2.563H.366v4.058h2.897V22h3.622V11.961h2.897c.18-1.281.362-2.777.362-4.058H6.705V5.126c.18-1.068.724-1.281 1.448-1.281z"
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
export default Facebook

Facebook.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

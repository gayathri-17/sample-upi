import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const ETHLogoDisable = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="134"
  height="135"
  fill="none"
  viewBox="0 0 134 135"
>
  <circle
    cx="66.863"
    cy="67.523"
    r="66.863"
    fill="#C4C4C4"
    transform="rotate(-90 66.863 67.523)"
  ></circle>
  <path
    fill="#fff"
    d="M69.038 85.589v18.332L91.79 71.947 69.038 85.59zM90.928 66.016l-21.89-36.395v26.474l21.89 9.921zM69.038 58.2v22.592l21.674-12.725L69.038 58.2zM45.209 66.016l21.89-36.395v26.474l-21.89 9.921zM67.097 58.2v22.592L45.315 68.067 67.097 58.2zM67.044 85.589v18.332L44.29 71.947 67.044 85.59z"
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
export default ETHLogoDisable

ETHLogoDisable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

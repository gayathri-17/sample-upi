import React from 'react'
import { SvgXml } from 'react-native-svg'
import { PropTypes } from 'prop-types'

const Mic = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="19"
  fill="none"
  viewBox="0 0 12 19"
>
  <path
    fill="#8E8E93"
    fillRule="evenodd"
    d="M6 0a3 3 0 013 3v7a3 3 0 11-6 0V3a3 3 0 013-3zm5.25 6.5a.75.75 0 00-.75.75V10a4.5 4.5 0 11-9 0V7.25a.75.75 0 00-1.5 0V10a6 6 0 005.25 5.95v1.55h-2a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-2v-1.55A6 6 0 0012 10V7.25a.75.75 0 00-.75-.75z"
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
export default Mic

Mic.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

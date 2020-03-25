import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const CancelImage = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        fill="#CCC"
        fillRule="evenodd"
        d="M34.932 31.207a2.634 2.634 0 11-3.725 3.729l-6.21-6.207-6.208 6.207a2.636 2.636 0 01-3.732.007 2.637 2.637 0 01.007-3.736L21.271 25l-6.207-6.207a2.64 2.64 0 01-.007-3.732 2.633 2.633 0 013.732 0l6.207 6.207 6.211-6.207a2.636 2.636 0 013.732 0 2.63 2.63 0 01-.007 3.732L28.73 25l6.203 6.207zM25 0C11.196 0 0 11.196 0 25s11.196 25 25 25c13.807 0 25-11.196 25-25S38.807 0 25 0z"
        clipRule="evenodd"
      ></path>
    </svg>
	`
  return (
    <SvgXml
      xml={xml}
      testID={props.testID}
      width={props.width ? props.width : '100%'}
      height={props.height ? props.height : '100%'}
    />
  )
}
export default CancelImage

CancelImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  testID: PropTypes.string,
}

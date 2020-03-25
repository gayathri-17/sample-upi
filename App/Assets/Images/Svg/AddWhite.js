import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const AddWhite = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="71"
      height="71"
      fill="none"
      viewBox="0 0 71 71"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M46.767 32.721a2.634 2.634 0 11.003 5.27l-8.78.004v8.778a2.636 2.636 0 01-2.635 2.644 2.637 2.637 0 01-2.636-2.647v-8.778H23.94a2.64 2.64 0 01-2.644-2.634 2.633 2.633 0 012.639-2.64h8.778l.002-8.78a2.636 2.636 0 012.64-2.639 2.63 2.63 0 012.633 2.644l.003 8.776 8.776.002zm-29.09-15.043c-9.76 9.76-9.76 25.595 0 35.355 9.761 9.76 25.595 9.76 35.356 0 9.763-9.763 9.76-25.595 0-35.355-9.76-9.76-25.592-9.763-35.355 0z"
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
export default AddWhite

AddWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

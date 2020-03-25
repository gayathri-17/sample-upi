import React from 'react'
import { SvgXml } from 'react-native-svg'
import { PropTypes } from 'prop-types'

const Profile = (props) => {
  const xml = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            fill="#001B36"
            fillRule="evenodd"
            d="M24 24s0-1.65-.137-2.512c-.113-.682-1.057-1.582-5.07-3.057-3.95-1.45-3.705-.744-3.705-3.412 0-1.732.88-.725 1.443-4.013.219-1.293.394-.431.869-2.506.25-1.088-.169-1.169-.119-1.688.05-.518.1-.98.194-2.043C17.587 3.456 16.369 0 12 0S6.412 3.456 6.531 4.775c.094 1.056.144 1.525.194 2.044.05.519-.369.6-.119 1.687.475 2.069.65 1.207.869 2.506.563 3.288 1.444 2.282 1.444 4.013 0 2.675.243 1.969-3.707 3.412C1.2 19.907.25 20.813.145 21.494 0 22.35 0 24 0 24h24z"
            clipRule="evenodd"
        ></path>
        <mask
            id="a"
            width="24"
            height="24"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M24 24s0-1.65-.137-2.512c-.113-.682-1.057-1.582-5.07-3.057-3.95-1.45-3.705-.744-3.705-3.412 0-1.732.88-.725 1.443-4.013.219-1.293.394-.431.869-2.506.25-1.088-.169-1.169-.119-1.688.05-.518.1-.98.194-2.043C17.587 3.456 16.369 0 12 0S6.412 3.456 6.531 4.775c.094 1.056.144 1.525.194 2.044.05.519-.369.6-.119 1.687.475 2.069.65 1.207.869 2.506.563 3.288 1.444 2.282 1.444 4.013 0 2.675.243 1.969-3.707 3.412C1.2 19.907.25 20.813.145 21.494 0 22.35 0 24 0 24h24z"
                clipRule="evenodd"
            ></path>
        </mask>
        <g mask="url(#a)">
            <path fill="#3AD1BF" d="M0 0H24V24H0z"></path>
        </g>
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
export default Profile

Profile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

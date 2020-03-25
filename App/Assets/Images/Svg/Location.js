import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Location = (props) => {
  const xml = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="10"
        fill="none"
        viewBox="0 0 8 10"
      >
        <path
            fill="#3AD1BF"
            d="M3.775 2.837H8.305V7.367000000000001H3.775z"
            transform="rotate(45 3.775 2.837)"
        />
        <circle cx="3.775" cy="3.775" r="3.775" fill="#3AD1BF" />
        <circle cx="3.776" cy="3.775" r="1.51" fill="#fff" />
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
export default Location

Location.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

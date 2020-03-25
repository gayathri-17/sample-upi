import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Search = (props) => {
  const xml = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    >
        <path
            fill="#8E8E93"
            fillRule="evenodd"
            d="M13.743 12.574L9.91 8.74a5.425 5.425 0 001.05-3.232A5.531 5.531 0 005.46 0 5.436 5.436 0 000 5.468a5.532 5.532 0 005.5 5.508 5.409 5.409 0 003.242-1.061l.004-.003 3.83 3.831a.827.827 0 101.167-1.169zM5.496 9.878a4.426 4.426 0 01-4.4-4.406 4.35 4.35 0 014.368-4.374 4.425 4.425 0 014.4 4.406 4.35 4.35 0 01-4.368 4.374z"
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
export default Search

Search.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

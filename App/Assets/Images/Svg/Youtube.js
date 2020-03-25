import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Youtube = (props) => {
  const xml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="17"
      fill="none"
      viewBox="0 0 22 17"
    >
      <path
        fill="#898989"
        fillRule="evenodd"
        d="M2.246 16.016c-.853-.213-1.28-.853-1.707-1.707-.64-1.922-.854-10.248.427-11.956.427-.64 1.067-.854 1.707-1.067 3.843-.427 15.371-.427 16.652.213.854.214 1.281.854 1.708 1.495.854 2.135.854 9.607 0 11.528-.213.64-.64.854-1.28 1.28-1.282.855-15.799.641-17.507.214zm5.978-4.056c2.348-1.067 4.483-2.348 6.832-3.416A101.865 101.865 0 008.224 5.13v6.831z"
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
export default Youtube

Youtube.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const DashLogoDisable = (props) => {
  const xml = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="134"
  height="134"
  fill="none"
  viewBox="0 0 134 134"
>
  <circle
    cx="66.863"
    cy="66.863"
    r="66.863"
    fill="#C4C4C4"
    transform="rotate(-90 66.863 66.863)"
  ></circle>
  <path
    fill="#fff"
    d="M76.66 39.635H51.965l-2.049 11.43 22.269.055c10.946 0 14.235 3.99 14.127 10.568-.054 3.397-1.51 9.112-2.157 10.945-1.671 4.961-5.176 10.569-18.17 10.569H44.308l-2.05 11.43h24.642c8.68 0 12.401-1.024 16.284-2.803 8.68-3.99 13.857-12.563 15.906-23.725 3.073-16.66-.755-28.47-22.43-28.47z"
  ></path>
  <path
    fill="#fff"
    d="M41.288 61.366c-6.47 0-7.386 4.205-7.98 6.74-.808 3.343-1.078 4.69-1.078 4.69h25.288c6.47 0 7.387-4.205 7.98-6.74.809-3.342 1.079-4.69 1.079-4.69H41.288z"
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
export default DashLogoDisable

DashLogoDisable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

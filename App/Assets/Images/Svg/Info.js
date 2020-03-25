import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Info = (props) => {
  const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <ellipse cx="10" cy="9.737" fill="#E5E5E5" rx="10" ry="9.737"></ellipse>
    <path
      fill="#898989"
      d="M9.011 11.852c0-.621.076-1.116.227-1.485.15-.368.426-.73.825-1.085.404-.36.673-.65.806-.872.133-.227.2-.464.2-.713 0-.75-.347-1.125-1.039-1.125-.329 0-.593.102-.792.306-.196.2-.298.477-.307.832H7c.009-.848.282-1.511.82-1.99.54-.48 1.278-.72 2.21-.72.941 0 1.671.229 2.19.686.52.453.78 1.094.78 1.924 0 .378-.084.735-.253 1.073-.169.333-.464.703-.886 1.112l-.54.512c-.336.325-.53.704-.579 1.14l-.026.405H9.01zm-.193 2.045c0-.298.1-.542.3-.733.204-.195.464-.293.779-.293s.572.098.772.293c.204.191.307.435.307.733a.96.96 0 01-.3.726c-.195.19-.455.286-.78.286-.323 0-.585-.096-.785-.286a.972.972 0 01-.293-.726z"
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
export default Info

Info.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

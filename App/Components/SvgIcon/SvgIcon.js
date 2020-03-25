import React from 'react'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

const Icon = (props) => {
  return <SvgXml xml={props.xml} width={props.width} height={props.height} />
}
export default Icon

Icon.propTypes = {
  xml: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

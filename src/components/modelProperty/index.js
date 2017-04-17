import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const iconSize = {
  width: 18,
  height: 18
}
const iconPadding = {
  horizontal: (24 - iconSize.height) / 2,
  vertical: (24 - iconSize.height) / 2
}
const iconNeededSpace = {
  horizontal: iconPadding.horizontal + iconSize.width + iconPadding.horizontal,
  vertical: iconPadding.vertical + iconSize.width + iconPadding.vertical
}
const iconGutter = 10

export class ModelProperty extends Component {
  static propTypes = {
    verticalOffset: PropTypes.number,
    modelWidth: PropTypes.number.isRequired,
    modelHeight: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const {
      verticalOffset,
      modelWidth,
      modelHeight,
      name
    } = this.props

    return (
      <svg x="0" y={verticalOffset} width={modelWidth} viewBox={`0 0 ${modelWidth} ${modelHeight}`} className="model-property">
        <rect x="0" y="0" className="property-background" />
        <text x={iconNeededSpace.horizontal + iconGutter} y="18" className="property-name">{name}</text>
      </svg>
    )
  }
}

export default ModelProperty

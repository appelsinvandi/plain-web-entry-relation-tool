import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { modelSizes, colors, dataTypeIconSizes } from '../../variables'
import { DtIconString } from '../../icons/data-types'

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
      <svg
        x="0"
        y={verticalOffset}
        width={modelWidth}
        viewBox={`0 0 ${modelWidth} ${modelHeight}`}
        fontFamily="'Roboto', sans-serif"
        className="model-property"
      >
        <DtIconString
          x={dataTypeIconSizes.padding}
          y={dataTypeIconSizes.padding}
          width={dataTypeIconSizes.width}
          height={dataTypeIconSizes.height}
        />
        <text
          x={iconNeededSpace.horizontal + iconGutter}
          y={modelSizes.propertyHeight / 2}
          textAnchor="start"
          fill="black"
          fontSize="12"
          fontWeight="400"
          alignmentBaseline="central"
        >{name}</text>
        <line
          x1="0"
          y1={modelSizes.propertyHeight}
          x2={modelWidth}
          y2={modelSizes.propertyHeight}
          strokeWidth="0.25"
          stroke={colors.dividerColor}
        />
      </svg>
    )
  }
}

export default ModelProperty

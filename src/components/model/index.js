import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Property from '../modelProperty/index'
import { modelSizes, colors } from '../../variables'

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

export class Model extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    name: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })),
    selected: PropTypes.bool,
    onSizeChange: PropTypes.func
  }

  static defaultProps = {
    selected: false
  }

  getTitleTextWidth = (titleText) => this.getTextWidth(titleText, '500 14px Arial')

  getPropertyTextWidth = (titleText) => this.getTextWidth(titleText, '400 12px Arial')

  getTextWidth = (text, fontStyle) => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    ctx.font = fontStyle
    return ctx.measureText(text).width
  }

  render() {
    const {
      name,
      properties,
      selected
    } = this.props

    const widestTextWidth = [
      this.getTitleTextWidth(name),
      ...properties.map(property => this.getPropertyTextWidth(property.name))
    ].sort((a, b) => a < b)[0]

    const modelWidth = iconNeededSpace.horizontal + iconGutter + widestTextWidth + iconGutter + iconNeededSpace.horizontal
    const modelHeight = modelSizes.headerHeight + (modelSizes.propertyHeight * properties.length)
    return (
      <svg
        width={modelWidth}
        height={modelHeight}
        viewBox={`0 0 ${modelWidth} ${modelHeight}`}
        className={cx('model', { active: selected })}
        fontFamily="'Roboto', sans-serif"
      >
        <g>
          <rect
            x="0"
            y="0"
            width={modelWidth}
            height={modelSizes.headerHeight}
            fill={selected ? colors.primaryColor : colors.primaryColorDark}
          />
          <text
            x={modelWidth / 2}
            y={modelSizes.headerHeight / 2}
            fontSize="14"
            textAnchor="middle"
            fill="white"
            fontWeight="500"
            alignmentBaseline="central"
          >{name}</text>
        </g>
        <g className="model-properties">
          {
            properties.map((property, index) => (
              <Property
                key={`model:${name}_property:${property.name}`}
                name={property.name}
                modelWidth={modelWidth}
                modelHeight={modelHeight}
                verticalOffset={modelSizes.headerHeight + modelSizes.propertyHeight * index}
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default Model

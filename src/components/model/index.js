import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Property from '../modelProperty/index'

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
    onSizeChange: PropTypes.func
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
      properties
    } = this.props

    const widestTextWidth = [
      this.getTitleTextWidth(name),
      ...properties.map(property => this.getPropertyTextWidth(property.name))
    ].sort((a, b) => a < b)[0]

    console.log(properties.map(property => this.getPropertyTextWidth(property.name)))

    const modelWidth = iconNeededSpace.horizontal + iconGutter + widestTextWidth + iconGutter + iconNeededSpace.horizontal
    const modelHeight = 24 + (36 * properties.length)
    return (
      <svg width={modelWidth} height={modelHeight} viewBox={`0 0 ${modelWidth} ${modelHeight}`} className="model">
        <g className="model-header">
          <rect x="0" y="0" className="header-background" />
          <text x={modelWidth / 2} y="12" className="header-title">{name}</text>
        </g>
        <g className="model-properties">
          {
            properties.map((property, index) => (
              <Property
                key={`model:${name}_property:${property.name}`}
                name={property.name}
                modelWidth={modelWidth}
                modelHeight={modelHeight}
                verticalOffset={24 + 36 * index}
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default Model

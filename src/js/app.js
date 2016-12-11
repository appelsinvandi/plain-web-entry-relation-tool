import Table from './table'
import Snap from 'snapsvg'

var colors = {
  backgroundDark: '#2C3E50',
  backgroundMedium: '#2980B9',
  backgroundMediumLight: '#3498DB',
  backgroundLight: '#ECF0F1',
  red: '#E74C3C',
}

var tables = []
var s = Snap('#diagram')

let getMarkerStyling = (reverse = false, fill = false) => {
  return {
    stroke: colors.backgroundMedium,
    strokeWidth: 1,
    fill: fill ? 'white' : 'none',
    strokeLinecap: 'butt',
    strokeLinejoin: 'miter',
    transform: reverse ? 'rotate(180deg)' : ''
  }
}

const markerFigures = {
  belongsTo: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M8,10 L4,6 L8,2"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  hasOne: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M6,2 L6,10"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  hasMany: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M4,10 L8,6 L4,2"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  hasManyThrough: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M4,10 L8,6 L4,2" +
      "M1,1 L11,1" +
      "M1,11 L11,11"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  hasAndBelongsToMany: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M11,10 L7,6 L11,2" +
      "M1,10 L5,6 L1,2"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  polymorphic: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M4,2 L8,2 L10,4 L10,8 L8,10 L4,10 L2,8 L2,4 L4,2"

    g.path(pathDefinition).attr(getMarkerStyling(reverse, true))

    return g
  },
  embedsOne: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M1,5 L1,1 L11,1 L11,5" +
      "M1,7 L1,11 L11,11 L11,7" +
      "M6,2 L6,10"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  },
  embedsMany: (reverse = false) => {
    const g = Snap(12, 12)
    const pathDefinition =
      "M1,5 L1,1 L11,1 L11,5" +
      "M1,7 L1,11 L11,11 L11,7" +
      "M4,10 L8,6 L4,2"

    g.path(pathDefinition).attr(getMarkerStyling(reverse))

    return g
  }
}

let getMarker = (markerName, place) => {
  if (markerFigures[markerName] == null)
    return null

  return markerFigures
    [markerName](place.toLowerCase() === 'end')
    .marker(0, 0, 12, 12, place.toLowerCase() === 'start' ? -2 : 14, 6)
}

let testLine1 = s.path("M100,100 L100,150 L150,150 L150,200")
let testLine2 = s.path("M200,100 L200,150 L250,150 L250,200")
let testLine3 = s.path("M300,100 L300,150 L350,150 L350,200")
let testLine4 = s.path("M400,100 L400,150 L450,150 L450,200")

const lineStyle = {
  stroke: colors.backgroundMedium,
  strokeWidth: 2,
  fill: 'none',
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter'
}
testLine1.attr(lineStyle)
testLine2.attr(lineStyle)
testLine3.attr(lineStyle)
testLine4.attr(lineStyle)

testLine1.attr({
  markerStart: getMarker('belongsTo', 'start'),
  markerEnd: getMarker('hasOne', 'end')
})
testLine2.attr({
  markerEnd: getMarker('hasMany', 'end'),
  markerStart: getMarker('hasManyThrough', 'start')
})
testLine3.attr({
  markerEnd: getMarker('hasAndBelongsToMany', 'end'),
  markerStart: getMarker('polymorphic', 'start')
})
testLine4.attr({
  markerEnd: getMarker('embedsOne', 'end'),
  markerStart: getMarker('embedsMany', 'start')
})

function addTable(e = null) {
  if (e === null) {
    document.querySelector('img#buttonNewTable').className = document.querySelector('div#diagramOverlay').className = 'active'
    document.querySelector('div#diagramOverlay').innerHTML = 'Click anywhere here to place new table'
    s.click(addTable)
  } else {
    let name = window.prompt('Please enter the table name', '')

    if (name !== null) {
      tables.push()
      s.append(new Table(name, e.offsetX, e.offsetY).canvas)
    }

    document.querySelector('img#buttonNewTable').className = document.querySelector('div#diagramOverlay').className = ''
    document.querySelector('div#diagramOverlay').innerHTML = ''
    s.unclick(addTable)
  }
}

document.querySelector('#buttonNewTable').onclick = addTable

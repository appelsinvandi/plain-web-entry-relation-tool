var colors = {
  backgroundDark: '#2C3E50',
  backgroundMedium: '#2980B9',
  backgroundMediumLight: '#3498DB',
  backgroundLight: '#ECF0F1',
  red: '#E74C3C',
}

var tables = []
var s = Snap('#diagram')

class Table {
  constructor(name, x = 10, y = 10) {
    let graphics = Snap()
    this.properties = {}

    this.metrics = {
      x,
      y,
      width: 300,
      height: 40
    }

    this.name = this.convertTableName(name)

    // Canvas
    this.canvas = graphics
    this.canvas.attr({
      id: this.name,
      class: 'table',
      x: this.metrics.x,
      y: this.metrics.y,
      width: this.metrics.width,
      height: this.metrics.height,
    })

    // Container
    this.container = graphics.rect(1, 1, this.metrics.width - 2, this.metrics.height - 2)
    this.container.addClass('background')
    this.container
      .drag((dx, dy) => // On move
          this.canvas.attr({
            x: this.metrics.x + dx,
            y: this.metrics.y + dy
          }),
        undefined, // On start
        () => { // On stop
          this.metrics.x = parseInt(this.canvas.attr('x'))
          this.metrics.y = parseInt(this.canvas.attr('y'))
        }
      )

    // Separator
    this.separator = graphics.rect(0, 38, this.metrics.width, '100%')
    this.separator.addClass('separator')

    // Label
    this.label = graphics.text(this.metrics.width / 2, this.metrics.height / 2 + 4, this.name)
    this.label.addClass('tableName')
    this.label.click(() => {
      let name = window.prompt('Enter new table name', this.name)

      if (name !== null)
        this.changeTableName(name)
    })

    // Buttons
    this.buttonAdd = graphics.append((() => {
        let g = Snap()
        g.attr({
          x: 10,
          y: 10,
        })
        g.addClass('button')

        g.rect()
          .addClass('background')

        // Plus
        g.line(10, 5, 10, 15)
          .addClass('line')
        g.line(5, 10, 15, 10)
          .addClass('line')

        g.click(() => this.addProperty(new Property(`Property ${Object.keys(this.properties).length + 1}`)))

        return g
      })()
    )
    this.buttonDelete = graphics.append((() => {
        let g = Snap()
        g.attr({
          x: this.metrics.width - 10 - 20,
          y: 10,
        })
        g.addClass('button')

        g.rect()
          .addClass('background')

        // Cross
        g.line(6, 6, 14, 14)
          .addClass('line')
        g.line(6, 14, 14, 6)
          .addClass('line')

        g.click(() => {
          g.parent().remove()
        })

        return g
      })()
    )

    this.addProperty(new Property('id'))
  }

  changeTableName(name) {
    this.name = this.convertTableName(name)
    this.label.node.innerHTML = this.name
    this.canvas.attr({
      id: this.name,
    })
  }

  addProperty(property) {
    this.properties[property.name] = property.canvas

    this.metrics.height = 40 + (40 * Object.keys(this.properties).length)
    this.canvas.attr({ height: this.metrics.height })
    this.container.attr({ height: this.metrics.height - 2 })

    this.properties[property.name].attr({ y: 40 * (Object.keys(this.properties).length) })

    this.canvas.append(this.properties[property.name])


    // TODO: Sorting the properties
    // Should be weighted based on primary key (and maybe foreign key) and then sorted by alpha desc
    // this.properties = Object.keys(this.properties).sort((a, b) => {
    //   if (a.hasClass('primaryKey') && b.hasClass('primaryKey')) {
    //     return 1
    //   }
    // })
  }

  convertTableName(name) {
    // Make all none-word chars into "_"
    name = name.replace(/[^\w\d]/g, '_')

    // Make the first letter lowercase
    name = name.substring(0, 1).toLowerCase() + name.substring(1, name.length)

    // Converts camelcase into underscore
    name = name.replace(/([A-Z])/g, '_$1')

    // Converts everything to lowercase, as some SQL systems does not support casing
    name = name.toLowerCase()

    return name
  }
}
class Property {
  constructor(name) {
    let graphics = Snap()

    this.metrics = {
      x: 2,
      y: 2,
      width: 296,
      height: 38
    }

    this.name = this.convertPropertyName(name)

    // Canvas
    this.canvas = graphics
    this.canvas.attr({
      id: this.name,
      class: 'property',
      x: this.metrics.x,
      y: this.metrics.y,
      width: this.metrics.width,
      height: this.metrics.height,
    })

    // Container
    this.container = graphics.rect(0, 0, '100%', '100%')
    this.container.addClass('background')

    // Label
    this.label = graphics.text(10 + 20 + 10, this.metrics.height / 2 + 4, this.name)
    this.label.addClass('label')
    this.label.click(() => {
      let name = window.prompt('Enter new property name', this.name)

      if (name !== null)
        this.changePropertyName(name)
    })

    // Buttons
    this.buttonPrimaryKey = graphics.append((() => {
        let g = Snap(20, 20)
        g.attr({
          x: 10,
          y: 10
        })
        if (g.parent().parent().selectAll('.property').items.length <= 0)
          g.addClass('active')
        g.addClass('button primaryKey')

        g.rect()
          .addClass('background')

        // Plus
        g.text(10, 10 + 4, "PK")
          .addClass('label')

        g.click(() => {
          g
            .parent()
            .parent()
            .selectAll('.property .button.primaryKey')
            .items.forEach(item =>
            item.removeClass('active')
          )

          g.toggleClass('active')
        })

        return g
      })()
    )
    this.buttonDelete = graphics.append((() => {
        let g = Snap()
        g.attr({
          x: this.metrics.width - 10 - 20,
          y: 10,
        })
        g.addClass('button')

        g.rect()
          .addClass('background')

        // Cross
        g.line(6, 6, 14, 14)
          .addClass('line')
        g.line(6, 14, 14, 6)
          .addClass('line')

        g.click(() => {
          g.parent().remove()
        })

        return g
      })()
    )
  }

  changePropertyName(name) {
    this.name = this.convertPropertyName(name)
    this.label.node.innerHTML = this.name
    this.canvas.attr({
      id: this.name,
    })
  }

  convertPropertyName(name) {
    // Make all none-word chars into "_"
    name = name.replace(/\W/g, '_')

    // Make the first letter lowercase
    name = name.substring(0, 1).toLowerCase() + name.substring(1, name.length)

    // Converts camelcase into underscore
    name = name.replace(/([A-Z])/g, '_$1')

    // Converts everything to lowercase, as some SQL systems does not support casing
    name = name.toLowerCase()

    return name
  }
}

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

let testLine1 = s.path("M100,100 L100,150 L150,150")
let testLine2 = s.path("M200,100 L200,150 L250,150")
let testLine3 = s.path("M300,100 L300,150 L350,150")
let testLine4 = s.path("M400,100 L400,150 L450,150")

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

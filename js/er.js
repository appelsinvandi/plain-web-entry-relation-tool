colors = {
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

    this.metrics = {
      x,
      y,
      width: 300,
      height: 40
    }

    this.name = this.convertTableName(name)

    this.properties = {}

    this.table = {
      canvas: graphics,
      container: graphics
          .rect(1, 1, this.metrics.width - 2, this.metrics.height - 2),
      separator: graphics
          .rect(0, 38, this.metrics.width, '100%'),
      label: graphics
          .text(this.metrics.width / 2, this.metrics.height / 2 + 4, this.name),

      buttonAdd: graphics.append((() => {
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
      ),
      buttonDelete: graphics.append((() => {
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

            return g
          })()
      ),
    }

    // Add classes and config
    this.table.canvas.attr({
      id: this.name,
      class: 'table',
      x: this.metrics.x,
      y: this.metrics.y,
      width: this.metrics.width,
      height: this.metrics.height,
    })
    this.table.container.addClass('background')
    this.table.separator.addClass('separator')
    this.table.label.addClass('tableName')
    this.table.label.click(() => {
      let name = window.prompt('Enter new table name', this.name)

      if (name !== null)
        this.changeTableName(name)
    })
  }

  changeTableName(name) {
    this.name = this.convertTableName(name)
    this.table.label.node.innerHTML = this.name
    this.table.canvas.attr({
      id: this.name,
    })
  }

  addProperty(property) {
    this.properties[property.name] = property.property.canvas

    this.metrics.height = 40 + (40 * Object.keys(this.properties).length)
    this.table.canvas.attr({height: this.metrics.height})
    this.table.container.attr({height: this.metrics.height - 2})

    this.properties[property.name].attr({y: 40 * (Object.keys(this.properties).length)})

    this.table.canvas.append(this.properties[property.name])


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

    this.property = {
      canvas: graphics,
      container: graphics
          .rect(0, 0, '100%', '100%'),
      label: graphics
          .text(10 + 20 + 10, this.metrics.height / 2 + 4, this.name),

      buttonPrimaryKey: graphics.append((() => {
            let g = Snap(20, 20)
            g.attr({
              x: 10,
              y: 10
            })
            g.addClass('button primaryKey')

            g.rect()
                .addClass('background')

            // Plus
            g.text(10, 10 + 4, "PK")
                .addClass('label')

            g.click((e) => console.log(g.toggleClass('active')))

            return g
          })()
      ),
      buttonDelete: graphics.append((() => {
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

            return g
          })()
      ),
    }

    // Add classes and config
    this.property.canvas.attr({
      id: this.name,
      class: 'property',
      x: this.metrics.x,
      y: this.metrics.y,
      width: this.metrics.width,
      height: this.metrics.height,
    })
    this.property.container.addClass('background')
    this.property.label.addClass('label')
    this.property.label.click(() => {
      let name = window.prompt('Enter new property name', this.name)

      if (name !== null)
        this.changePropertyName(name)
    })
  }

  changePropertyName(name) {
    this.name = this.convertPropertyName(name)
    this.property.label.node.innerHTML = this.name
    this.property.canvas.attr({
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

function addTable(e = null) {
  if (e === null) {
    document.querySelector('img#buttonNewTable').className = 'active'
    s.click(addTable)
  } else {
    let name = window.prompt('Please enter the table name', '')

    if (name !== null) {
      tables.push(new Table(name, e.offsetX, e.offsetY))
      s.append(tables[tables.length - 1].table.canvas)
    }

    document.querySelector('img#buttonNewTable').className = ''
    s.unclick(addTable)
  }
}
import Property from './property'

export default class Table {
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

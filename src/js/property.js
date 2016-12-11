export default class Property {
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

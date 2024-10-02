var sketch = require('sketch')

export default function() {

  const document = sketch.getSelectedDocument()
  const selection = document.selectedLayers

  if (selection.length === 0) {
    const page = document.selectedPage
    const layers = page.layers

    if (layers.length === 0) {
      sketch.UI.message('zerozero » no layers on this page 😿')
      return
    }

    let top = layers[0]
    layers.forEach(layer => {
      if (layer.frame.y < top.frame.y) {
        top = layer
      }
    })

    const deltaX = -top.frame.x
    const deltaY = -top.frame.y

    layers.forEach(layer => {
      layer.frame.x += deltaX
      layer.frame.y += deltaY
    })
  } else if (selection.length === 1) {
    const layer = selection.layers[0]
    layer.frame.x = 0
    layer.frame.y = 0
  } else {
    const layers = selection.layers

    let top = layers[0]
    layers.forEach(layer => {
      if (layer.frame.y < top.frame.y) {
        top = layer
      }
    })

    const deltaX = -top.frame.x
    const deltaY = -top.frame.y

    layers.forEach(layer => {
      layer.frame.x += deltaX
      layer.frame.y += deltaY
    })
  }

  sketch.UI.message('zerozero » organized from top-most layer 😸')
}

var sketch = require('sketch')

function findTarget(layers, primaryAxis, secondaryAxis) {
  let minPrimary = Math.min(...layers.map(layer => layer.frame[primaryAxis]))
  const primaryLayers = layers.filter(layer => layer.frame[primaryAxis] === minPrimary)

  let minSecondary = Math.min(...primaryLayers.map(layer => layer.frame[secondaryAxis]))
  return primaryLayers.find(layer => layer.frame[secondaryAxis] === minSecondary)
}

export default function() {

  const document = sketch.getSelectedDocument()
  const selection = document.selectedLayers

  if (selection.length === 1) {
    const layer = selection.layers[0]
    layer.frame.x = 0
    layer.frame.y = 0
    sketch.UI.message('zerozero » layer moved to (0,0) 😼')
    return
  }

  const layers = selection.length === 0
    ? document.selectedPage.layers
    : selection.layers

  if (layers.length === 0) {
    sketch.UI.message('zerozero » no layers on this page 😿')
    return
  }

  const target = findTarget(layers, 'x', 'y')

  const deltaX = -target.frame.x
  const deltaY = -target.frame.y

  layers.forEach(layer => {
    layer.frame.x += deltaX
    layer.frame.y += deltaY
  })

  sketch.UI.message('zerozero » organized from left-most layer 😸')
}

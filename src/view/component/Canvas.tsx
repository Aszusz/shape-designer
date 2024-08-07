import useRelativeMouseEvents from '../hooks/useRelativeMouseEvents'
import Grid from './Grid'
import Preview from './Preview'
import Shape from './Shape'
import {
  onMouseDown,
  onMouseMove,
  onMouseUp,
  previewSelector,
  useStore
} from '@/store'
import { useRef } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)

  const width = useStore(c => c.canvasSize.width)
  const height = useStore(c => c.canvasSize.height)
  const toolType = useStore(c => c.toolType)
  const shapesIds = useStore(c => c.shapes.getOrder())
  const preview = useStore(c => previewSelector(c))

  useRelativeMouseEvents(
    canvasRef,
    position => {
      onMouseMove(position)
    },
    pos => onMouseDown(pos),
    () => onMouseUp()
  )

  console.log('Canvas render')

  return (
    <svg
      style={{
        width: `${width + 2}px`,
        height: `${height + 2}px`,
        backgroundColor: '#d1d5db'
      }}
    >
      <svg
        ref={canvasRef}
        overflow={'visible'}
        x={1}
        y={1}
        width={width}
        height={height}
        fill='transparent'
      >
        {/* Render the Grid first */}
        <Grid />
        {/* Render existing shapes on top of the Grid */}
        {shapesIds.map(shapeId => (
          <Shape key={shapeId} shapeId={shapeId} />
        ))}
        {/* Render the preview shape on top of everything */}
        <Preview preview={preview} toolType={toolType} />
      </svg>
    </svg>
  )
}

export default Canvas

import useGlobalHotkey from '../hooks/useGlobalHotkey'
import useRelativeMouseEvents from '../hooks/useRelativeMouseEvents'
import Grid from './Grid'
import Shape from './Shape'
import ToolPreview from './ToolPreview'
import {
  deleteSelectedShapes,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  useCanvasSize,
  useShapeIds
} from '@/store'
import { useRef } from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)

  const { width, height } = useCanvasSize()
  const shapeIds = useShapeIds()

  useRelativeMouseEvents(
    canvasRef,
    position => {
      onMouseMove(position)
    },
    pos => onMouseDown(pos),
    () => onMouseUp()
  )

  useGlobalHotkey({ key: 'Delete' }, () => {
    deleteSelectedShapes()
  })

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
        {shapeIds.map(shapeId => (
          <Shape key={shapeId} shapeId={shapeId} />
        ))}
        {/* Render the preview shape on top of everything */}
        <ToolPreview />
      </svg>
    </svg>
  )
}

export default Canvas

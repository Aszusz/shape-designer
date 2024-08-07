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
  const shapes = useStore(c => c.shapes)
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
      ref={canvasRef}
      style={{
        width: `${width + 1}px`,
        height: `${height + 1}px`,
        backgroundColor: 'white'
      }}
    >
      {/* Render the Grid first */}
      <Grid />

      {/* Render existing shapes on top of the Grid */}
      {shapes.map((shape, index) => (
        <Shape key={index} shape={shape} />
      ))}

      {/* Render the preview shape on top of everything */}
      <Preview preview={preview} toolType={toolType} />

      <rect
        ref={canvasRef}
        x={1}
        y={1}
        width={width}
        height={height}
        fill='transparent'
      />
    </svg>
  )
}

export default Canvas

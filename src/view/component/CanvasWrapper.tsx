import useRelativeMouseEvents from '../hooks/useRelativeMouseEvents'
import {
  onMouseDown,
  onMouseMove,
  onMouseUp,
  previewSelector,
  useStore
} from '@/store'
import { useRef } from 'react'

const CanvasWrapper = () => {
  const width = useStore(c => c.canvasWidth)
  const height = useStore(c => c.canvasHeight)
  const canvasRef = useRef(null)

  const preview = useStore(c => previewSelector(c))

  useRelativeMouseEvents(
    canvasRef,
    position => {
      onMouseMove(position)
    },
    pos => onMouseDown(pos),
    () => onMouseUp()
  )

  console.log('CanvasWrapper render')

  return (
    <div className='overflow-auto border-gray-200'>
      <div
        className='grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] bg-gray-200'
        style={{
          minWidth: `100%`,
          minHeight: `100%`,
          width: `${width}px`,
          height: `${height}px`,
          shapeRendering: 'crispEdges'
        }}
      >
        {/* Canvas */}
        <svg
          ref={canvasRef}
          className='col-start-2 row-start-2 bg-white'
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {preview && (
            <rect
              x={preview.x}
              y={preview.y}
              width={preview.width}
              height={preview.height}
              fill='none'
              stroke='black'
              strokeWidth='1'
            />
          )}
        </svg>
      </div>
    </div>
  )
}

export default CanvasWrapper

import useRelativeMouseEvents from '../hooks/useRelativeMouseEvents'
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

  const width = useStore(c => c.canvasWidth)
  const height = useStore(c => c.canvasHeight)
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
  )
}

export default Canvas

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
    <div>
      <svg
        ref={canvasRef}
        className='col-start-2 row-start-2 bg-white'
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <defs>
          <pattern
            id='smallGrid'
            width='10'
            height='10'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M 10 0 L 0 0 0 10'
              fill='none'
              stroke='#f3f4f6'
              strokeWidth='1'
            />
          </pattern>
          <pattern
            id='grid'
            width='100'
            height='100'
            patternUnits='userSpaceOnUse'
          >
            <rect width='100' height='100' fill='url(#smallGrid)' />
            <path
              d='M 100 0 L 0 0 0 100'
              fill='transparent'
              stroke='#e5e7eb'
              strokeWidth='1'
            />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#grid)' />
        {shapes.map((shape, index) => {
          if (shape.type === 'rectangle_shape') {
            return (
              <rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke='black'
                fill='white'
              />
            )
          } else if (shape.type === 'ellipse_shape') {
            return (
              <ellipse
                key={index}
                cx={shape.x + shape.width / 2} // Center x
                cy={shape.y + shape.height / 2} // Center y
                rx={shape.width / 2} // Radius x
                ry={shape.height / 2} // Radius y
                stroke='black'
                fill='white'
              />
            )
          }
          return null
        })}

        {preview && toolType === 'select_tool' && (
          <rect
            x={preview.x}
            y={preview.y}
            width={preview.width}
            height={preview.height}
            stroke='blue'
            fill='rgba(0, 0, 255, 0.2)'
          />
        )}

        {preview && toolType === 'rectangle_tool' && (
          <rect
            x={preview.x}
            y={preview.y}
            width={preview.width}
            height={preview.height}
            stroke='darkgrey'
            fill='white'
          />
        )}

        {preview && toolType === 'ellipse_tool' && (
          <ellipse
            cx={preview.x + preview.width / 2} // Center x
            cy={preview.y + preview.height / 2} // Center y
            rx={preview.width / 2} // Radius x
            ry={preview.height / 2} // Radius y
            stroke='darkgrey'
            fill='white'
          />
        )}
      </svg>
    </div>
  )
}

export default Canvas

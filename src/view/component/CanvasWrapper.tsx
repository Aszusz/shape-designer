import useRelativeMouseEvents from '../hooks/useRelativeMouseEvents'
import { setMousePosition, useStore } from '@/store'
import { useRef } from 'react'

const CanvasWrapper = () => {
  const width = useStore(c => c.canvasWidth)
  const height = useStore(c => c.canvasHeight)
  const canvasRef = useRef(null)

  useRelativeMouseEvents(
    canvasRef,
    position => {
      setMousePosition(position)
    },
    pos => console.log('onMouseDown', pos),
    pos => console.log('onMouseUp', pos)
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
          height: `${height}px`
        }}
      >
        {/* Canvas */}
        <div
          ref={canvasRef}
          className='col-start-2 row-start-2 bg-white'
          style={{ width: `${width}px`, height: `${height}px` }}
        ></div>
      </div>
    </div>
  )
}

export default CanvasWrapper

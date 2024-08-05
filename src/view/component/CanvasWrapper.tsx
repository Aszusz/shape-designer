import Canvas from './Canvas'
import { useStore } from '@/store'

const CanvasWrapper = () => {
  const width = useStore(c => c.canvasSize.width)
  const height = useStore(c => c.canvasSize.height)
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
        <Canvas />
      </div>
    </div>
  )
}

export default CanvasWrapper

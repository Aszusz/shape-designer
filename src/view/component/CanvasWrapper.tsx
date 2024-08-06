import useDynamicPadding from '../hooks/useDynamicPadding'
import Canvas from './Canvas'
import { useStore } from '@/store'
import { useRef } from 'react'

const CanvasWrapper = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const padding = useDynamicPadding(scrollRef)
  const width = useStore(c => c.canvasSize.width)

  return (
    <div ref={scrollRef} className='overflow-auto border-gray-200'>
      <div
        className='bg-gray-200'
        style={{
          minWidth: `max(100%, ${width}px)`,
          minHeight: `100%`,
          shapeRendering: 'geometricPrecision',
          paddingLeft: `${padding.left}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingTop: `${padding.top}px`
        }}
      >
        <Canvas />
      </div>
    </div>
  )
}

export default CanvasWrapper

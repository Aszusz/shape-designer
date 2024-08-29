import { CANVAS_BORDER_THICKNESS } from './CanvasBorder'
import { useStore } from '@/shell/store'
import { FC, ReactNode } from 'react'

interface CanvasPaddingProps {
  children: ReactNode
}

const CanvasPadding: FC<CanvasPaddingProps> = ({ children }) => {
  const canvasSize = useStore(state => state.history.present.canvasSize)

  return (
    <div
      className='bg-gray-200'
      style={{
        minWidth: `max(100%, ${canvasSize.width + 2 * CANVAS_BORDER_THICKNESS}px)`,
        minHeight: `max(100%, ${canvasSize.height + 2 * CANVAS_BORDER_THICKNESS}px)`,
        shapeRendering: 'geometricPrecision',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      {children}
    </div>
  )
}

export default CanvasPadding

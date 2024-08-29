import { useStore } from '@/shell/store'
import { FC, ReactNode } from 'react'

interface CanvasBorderProps {
  children: ReactNode
}

export const CANVAS_BORDER_THICKNESS = 1.0

const CanvasBorder: FC<CanvasBorderProps> = ({ children }) => {
  const size = useStore(state => state.history.present.canvasSize)

  return (
    <svg
      style={{
        width: `${size.width + 2 * CANVAS_BORDER_THICKNESS}px`,
        height: `${size.height + 2 * CANVAS_BORDER_THICKNESS}px`,
        backgroundColor: '#d1d5db'
      }}
    >
      {children}
    </svg>
  )
}

export default CanvasBorder

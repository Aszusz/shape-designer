import { FC, ReactNode } from 'react'

interface CanvasBorderProps {
  children: ReactNode
  canvasWidth: number
  canvasHeight: number
}

const CanvasBorder: FC<CanvasBorderProps> = ({
  children,
  canvasWidth,
  canvasHeight
}) => (
  <svg
    style={{
      width: `${canvasWidth + 2}px`,
      height: `${canvasHeight + 2}px`,
      backgroundColor: '#d1d5db'
    }}
  >
    {children}
  </svg>
)

CanvasBorder.displayName = 'CanvasBorder'

export default CanvasBorder

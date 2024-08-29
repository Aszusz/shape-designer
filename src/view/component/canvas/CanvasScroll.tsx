import { FC, ReactNode } from 'react'

interface CanvasScrollProps {
  children: ReactNode
}

const CanvasScroll: FC<CanvasScrollProps> = ({ children }) => (
  <div className='overflow-auto border-gray-200'>{children}</div>
)

export default CanvasScroll

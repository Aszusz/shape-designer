import React, { FC, ReactNode } from 'react'

interface CanvasScrollProps {
  children: ReactNode
  scrollRef: React.RefObject<HTMLDivElement>
}

const CanvasScroll: FC<CanvasScrollProps> = ({ children, scrollRef }) => (
  <div ref={scrollRef} className='overflow-auto border-gray-200'>
    {children}
  </div>
)

export default CanvasScroll

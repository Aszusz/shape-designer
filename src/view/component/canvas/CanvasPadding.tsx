import useDynamicPadding from '@/view/hooks/useDynamicPadding'
import React, { FC, ReactNode } from 'react'

interface CanvasPaddingProps {
  children: ReactNode
  borderWidth: number
  scrollRef: React.RefObject<HTMLDivElement>
}

const CanvasPadding: FC<CanvasPaddingProps> = ({
  children,
  borderWidth,
  scrollRef
}) => {
  const padding = useDynamicPadding(scrollRef)

  return (
    <div
      className='bg-gray-200'
      style={{
        minWidth: `max(100%, ${borderWidth}px)`,
        minHeight: `100%`,
        shapeRendering: 'geometricPrecision',
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingTop: `${padding.top}px`
      }}
    >
      {children}
    </div>
  )
}

export default CanvasPadding

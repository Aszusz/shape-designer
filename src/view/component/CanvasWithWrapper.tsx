// CanvasWithWrapper.tsx
import CanvasBorder from './canvas/CanvasBorder'
import CanvasController from './canvas/CanvasController'
import CanvasPadding from './canvas/CanvasPadding'
import CanvasRenderer from './canvas/CanvasRenderer'
import CanvasScroll from './canvas/CanvasScroll'
import { useStore } from '@/shell/store'
import React, { useRef } from 'react'

const CanvasWithWrapper: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<SVGSVGElement>(null)
  const { width: borderWidth } = useStore().getCanvasBorderSize()

  return (
    <CanvasScroll scrollRef={scrollRef}>
      <CanvasPadding borderWidth={borderWidth} scrollRef={scrollRef}>
        <CanvasBorder>
          <CanvasRenderer canvasRef={canvasRef} />
          <CanvasController canvasRef={canvasRef} />
        </CanvasBorder>
      </CanvasPadding>
    </CanvasScroll>
  )
}

CanvasWithWrapper.displayName = 'CanvasWithWrapper'

export default CanvasWithWrapper

// CanvasWithWrapper.tsx
import CanvasBorder from './canvas/CanvasBorder'
import CanvasController from './canvas/CanvasController'
import CanvasPadding from './canvas/CanvasPadding'
import CanvasRenderer from './canvas/CanvasRenderer'
import CanvasScroll from './canvas/CanvasScroll'
import React, { useRef } from 'react'

const CanvasWithWrapper: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<SVGSVGElement>(null)

  return (
    <CanvasScroll scrollRef={scrollRef}>
      <CanvasPadding>
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

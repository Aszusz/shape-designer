import CanvasBorder from '@/view/component/canvas/CanvasBorder'
import CanvasController from '@/view/component/canvas/CanvasController'
import CanvasPadding from '@/view/component/canvas/CanvasPadding'
import CanvasRenderer from '@/view/component/canvas/CanvasRenderer'
import CanvasScroll from '@/view/component/canvas/CanvasScroll'
import React from 'react'

const Canvas: React.FC = () => {
  return (
    <CanvasScroll>
      <CanvasPadding>
        <CanvasBorder>
          <CanvasController />
          <CanvasRenderer />
        </CanvasBorder>
      </CanvasPadding>
    </CanvasScroll>
  )
}

Canvas.displayName = 'CanvasWithWrapper'

export default Canvas

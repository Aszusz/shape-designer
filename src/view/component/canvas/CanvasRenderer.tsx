// CanvasRenderer.tsx
import Grid from '../Grid'
import Shape from '../Shape'
import ToolPreview from '../ToolPreview'
import { useStore } from '@/shell/store'
import { FC, RefObject } from 'react'

interface CanvasRendererProps {
  canvasRef: RefObject<SVGSVGElement>
}

const CanvasRenderer: FC<CanvasRendererProps> = ({ canvasRef }) => {
  const shapeIds = useStore().getShapeIds()
  const { width: canvasWidth, height: canvasHeight } = useStore(
    state => state.history.present.canvasSize
  )

  return (
    <svg
      ref={canvasRef}
      overflow='visible'
      x={1}
      y={1}
      width={canvasWidth}
      height={canvasHeight}
      fill='transparent'
    >
      <Grid />
      {shapeIds.map(shapeId => (
        <Shape key={shapeId} shapeId={shapeId} />
      ))}
      <ToolPreview />
    </svg>
  )
}

CanvasRenderer.displayName = 'CanvasRenderer'

export default CanvasRenderer

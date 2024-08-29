// CanvasRenderer.tsx
import Shape from '../Shape'
import ToolPreview from '../ToolPreview'
import Grid from './Grid'
import { useStore } from '@/shell/store'
import { FC } from 'react'

interface CanvasRendererProps {}

const CanvasRenderer: FC<CanvasRendererProps> = () => {
  const shapeIds = useStore().getShapeIds()
  const { width: canvasWidth, height: canvasHeight } = useStore(
    state => state.history.present.canvasSize
  )

  return (
    <svg
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

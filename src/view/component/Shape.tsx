import ShapeSelectionBox from './ShapeSelectionBox'
import { useShape } from '@/store'

type ShapeViewProps = {
  shapeId: string
}

const INNER_STROKE_COLOR = 'black'
const INNER_STROKE_THICKNESS = 2

const Shape = ({ shapeId }: ShapeViewProps) => {
  const shape = useShape(shapeId)

  if (!shape) {
    return <></>
  }

  return (
    <>
      {/* Selection Box (Outer border and resize handles) */}
      {shape.isSelected && <ShapeSelectionBox shapeId={shapeId} />}

      {/* Render Shape */}
      {shape.type === 'rectangle_shape' ? (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          stroke={INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : 'white'}
          strokeWidth={INNER_STROKE_THICKNESS}
        />
      ) : shape.type === 'ellipse_shape' ? (
        <ellipse
          cx={shape.x + shape.width / 2}
          cy={shape.y + shape.height / 2}
          rx={shape.width / 2}
          ry={shape.height / 2}
          stroke={INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : 'white'}
          strokeWidth={INNER_STROKE_THICKNESS}
        />
      ) : null}
    </>
  )
}

export default Shape

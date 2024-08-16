import ShapeSelectionBox from './ShapeSelectionBox'
import { useStore } from '@/shell/store'

type ShapeViewProps = {
  shapeId: string
}

const INNER_STROKE_COLOR = 'black'
const FILL_COLOR = 'white'
const INNER_STROKE_THICKNESS = 2

const Shape = ({ shapeId }: ShapeViewProps) => {
  const shape = useStore().getShape(shapeId)

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
          stroke={shape.borderColor ? shape.borderColor : INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : FILL_COLOR}
          strokeWidth={INNER_STROKE_THICKNESS}
        />
      ) : shape.type === 'ellipse_shape' ? (
        <ellipse
          cx={shape.x + shape.width / 2}
          cy={shape.y + shape.height / 2}
          rx={shape.width / 2}
          ry={shape.height / 2}
          stroke={shape.borderColor ? shape.borderColor : INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : FILL_COLOR}
          strokeWidth={INNER_STROKE_THICKNESS}
        />
      ) : null}
    </>
  )
}

export default Shape

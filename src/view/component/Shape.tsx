import { useShape } from '@/store'

type ShapeViewProps = {
  shapeId: string
}

// Extracted Constants
const INNER_STROKE_COLOR = 'black'
const OUTER_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_FILL_COLOR = 'white'

// Stroke thickness and spacing constants
const INNER_STROKE_THICKNESS = 2
const OUTER_STROKE_THICKNESS = 2
const STROKE_SPACING = 8 // Distance between the inner and outer borders

const Shape = ({ shapeId }: ShapeViewProps) => {
  const shape = useShape(shapeId)

  if (!shape) {
    return <></>
  }

  const handleSize = 10 // Size of the resize handles

  // Helper function to render resize handles
  const renderHandles = () => {
    if (!shape.isSelected) return null

    const halfHandleSize = handleSize / 2
    const handleOffset =
      OUTER_STROKE_THICKNESS + STROKE_SPACING + halfHandleSize - 1

    const handles = [
      // Corner handles
      { x: shape.x - handleOffset, y: shape.y - handleOffset }, // Top-left
      {
        x: shape.x + shape.width + handleOffset - handleSize,
        y: shape.y - handleOffset
      }, // Top-right
      {
        x: shape.x - handleOffset,
        y: shape.y + shape.height + handleOffset - handleSize
      }, // Bottom-left
      {
        x: shape.x + shape.width + handleOffset - handleSize,
        y: shape.y + shape.height + handleOffset - handleSize
      }, // Bottom-right

      // Midpoint handles
      {
        x: shape.x + shape.width / 2 - halfHandleSize,
        y: shape.y - handleOffset
      }, // Top-middle
      {
        x: shape.x + shape.width / 2 - halfHandleSize,
        y: shape.y + shape.height + handleOffset - handleSize
      }, // Bottom-middle
      {
        x: shape.x - handleOffset,
        y: shape.y + shape.height / 2 - halfHandleSize
      }, // Left-middle
      {
        x: shape.x + shape.width + handleOffset - handleSize,
        y: shape.y + shape.height / 2 - halfHandleSize
      } // Right-middle
    ]

    return handles.map((handle, index) => (
      <rect
        key={index}
        x={handle.x}
        y={handle.y}
        width={handleSize}
        height={handleSize}
        fill={RESIZE_HANDLE_FILL_COLOR}
        stroke={RESIZE_HANDLE_STROKE_COLOR}
        strokeWidth={1}
        color={shape.color}
      />
    ))
  }

  if (shape.type === 'rectangle_shape') {
    return (
      <>
        {/* Outer blue border, rendered first so it appears behind the black border */}
        {shape.isSelected && (
          <rect
            x={shape.x - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
            y={shape.y - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
            width={shape.width + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
            height={shape.height + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
            stroke={OUTER_STROKE_COLOR}
            fill='none'
            strokeWidth={OUTER_STROKE_THICKNESS}
          />
        )}

        {/* Inner black border */}
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          stroke={INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : 'white'}
          strokeWidth={INNER_STROKE_THICKNESS}
        />

        {/* Resize handles */}
        {renderHandles()}
      </>
    )
  } else if (shape.type === 'ellipse_shape') {
    return (
      <>
        {/* Outer blue border */}
        {shape.isSelected && (
          <rect
            x={shape.x - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
            y={shape.y - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
            width={shape.width + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
            height={shape.height + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
            stroke={OUTER_STROKE_COLOR}
            fill='none'
            strokeWidth={OUTER_STROKE_THICKNESS}
          />
        )}

        {/* Inner black border */}
        <ellipse
          cx={shape.x + shape.width / 2}
          cy={shape.y + shape.height / 2}
          rx={shape.width / 2}
          ry={shape.height / 2}
          stroke={INNER_STROKE_COLOR}
          fill={shape.color ? shape.color : 'white'}
          strokeWidth={INNER_STROKE_THICKNESS}
        />

        {/* Resize handles */}
        {renderHandles()}
      </>
    )
  }
  return null
}

export default Shape

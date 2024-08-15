import { useShape } from '@/store'

type ShapeSelectionBoxProps = {
  shapeId: string
}

const OUTER_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_FILL_COLOR = 'white'

const OUTER_STROKE_THICKNESS = 2
const STROKE_SPACING = 8
const HANDLE_SIZE = 8

const ShapeSelectionBox = ({ shapeId }: ShapeSelectionBoxProps) => {
  const shape = useShape(shapeId)

  if (!shape || !shape.isSelected) return null

  const halfHandleSize = HANDLE_SIZE / 2
  const handleOffset =
    OUTER_STROKE_THICKNESS + STROKE_SPACING + halfHandleSize - 1

  const handles = [
    // Corner handles
    { x: shape.x - handleOffset, y: shape.y - handleOffset }, // Top-left
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y - handleOffset
    }, // Top-right
    {
      x: shape.x - handleOffset,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-left
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-right

    // Midpoint handles
    {
      x: shape.x + shape.width / 2 - halfHandleSize,
      y: shape.y - handleOffset
    }, // Top-middle
    {
      x: shape.x + shape.width / 2 - halfHandleSize,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-middle
    {
      x: shape.x - handleOffset,
      y: shape.y + shape.height / 2 - halfHandleSize
    }, // Left-middle
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y + shape.height / 2 - halfHandleSize
    } // Right-middle
  ]

  return (
    <>
      {/* Outer blue border */}
      <rect
        x={shape.x - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
        y={shape.y - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
        width={shape.width + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
        height={shape.height + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
        stroke={OUTER_STROKE_COLOR}
        fill='none'
        strokeWidth={OUTER_STROKE_THICKNESS}
      />

      {/* Resize handles */}
      {handles.map((handle, index) => (
        <rect
          key={index}
          x={handle.x}
          y={handle.y}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={RESIZE_HANDLE_FILL_COLOR}
          stroke={RESIZE_HANDLE_STROKE_COLOR}
          strokeWidth={1}
        />
      ))}
    </>
  )
}

export default ShapeSelectionBox

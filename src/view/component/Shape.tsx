import { Shape as ShapeModel } from '@/model/canvas'

type ShapeViewProps = {
  shape: ShapeModel
}

const Shape = ({ shape }: ShapeViewProps) => {
  if (shape.type === 'rectangle_shape') {
    return (
      <rect
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        stroke='black'
        fill='white'
        strokeWidth={2}
      />
    )
  } else if (shape.type === 'ellipse_shape') {
    return (
      <ellipse
        cx={shape.x + shape.width / 2} // Center x
        cy={shape.y + shape.height / 2} // Center y
        rx={shape.width / 2} // Radius x
        ry={shape.height / 2} // Radius y
        stroke='black'
        fill='white'
        strokeWidth={2}
      />
    )
  }
  return null
}

export default Shape

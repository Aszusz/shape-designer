import { BoundingBox } from '@/model/geometry'

type PreviewProps = {
  preview: BoundingBox | null | undefined
  toolType: string
}

const Preview = ({ preview, toolType }: PreviewProps) => {
  if (!preview) return null

  if (toolType === 'select_tool') {
    return (
      <rect
        x={preview.x}
        y={preview.y}
        width={preview.width}
        height={preview.height}
        stroke='blue'
        strokeWidth={2}
        style={{ strokeDasharray: '6,2' }}
        fill='rgba(0, 0, 255, 0.1)'
      />
    )
  }

  if (toolType === 'rectangle_tool') {
    return (
      <rect
        x={preview.x}
        y={preview.y}
        width={preview.width}
        height={preview.height}
        stroke='darkgrey'
        fill='white'
        strokeWidth={2}
      />
    )
  }

  if (toolType === 'ellipse_tool') {
    return (
      <ellipse
        cx={preview.x + preview.width / 2} // Center x
        cy={preview.y + preview.height / 2} // Center y
        rx={preview.width / 2} // Radius x
        ry={preview.height / 2} // Radius y
        stroke='darkgrey'
        fill='white'
        strokeWidth={2}
      />
    )
  }

  return null
}

export default Preview

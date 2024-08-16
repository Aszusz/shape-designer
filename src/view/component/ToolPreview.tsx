import { useStore } from '@/shell/store'

const ToolPreview = () => {
  const toolType = useStore(state => state.toolType)
  const toolPreview = useStore().getToolPreview()

  if (!toolPreview) return null

  if (toolType === 'select_tool') {
    return (
      <rect
        x={toolPreview.x}
        y={toolPreview.y}
        width={toolPreview.width}
        height={toolPreview.height}
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
        x={toolPreview.x}
        y={toolPreview.y}
        width={toolPreview.width}
        height={toolPreview.height}
        stroke='darkgrey'
        fill='white'
        strokeWidth={2}
      />
    )
  }

  if (toolType === 'ellipse_tool') {
    return (
      <ellipse
        cx={toolPreview.x + toolPreview.width / 2} // Center x
        cy={toolPreview.y + toolPreview.height / 2} // Center y
        rx={toolPreview.width / 2} // Radius x
        ry={toolPreview.height / 2} // Radius y
        stroke='darkgrey'
        fill='white'
        strokeWidth={2}
      />
    )
  }

  return null
}

export default ToolPreview

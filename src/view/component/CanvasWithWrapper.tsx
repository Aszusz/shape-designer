import useDynamicPadding from '../hooks/useDynamicPadding'
import useGlobalHotkey from '../hooks/useGlobalHotkey'
import useRelativeMouseDown from '../hooks/useRelativeMouseDown'
import useRelativeMouseMove from '../hooks/useRelativeMouseMove'
import useRelativeMouseUp from '../hooks/useRelativeMouseUp'
import Grid from './Grid'
import Shape from './Shape'
import ToolPreview from './ToolPreview'
import { useStore } from '@/shell/store'
import { useRef } from 'react'

const CanvasWithWrapper = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef(null)

  const padding = useDynamicPadding(scrollRef)
  const { width: canvasWidth, height: canvasHeight } = useStore(
    state => state.history.present.canvasSize
  )
  const shapeIds = useStore().getShapeIds()
  const { onMouseDown, onMouseMove, onMouseUp, deleteSelectedShapes } =
    useStore()

  const { width: borderWidth } = useStore().getCanvasBorderSize()

  useRelativeMouseUp((_x, _y, e) => {
    onMouseUp(e.ctrlKey ? 'toggle' : 'replace')
  }, canvasRef.current)

  useRelativeMouseDown((x, y) => {
    onMouseDown({ x: Math.round(x), y: Math.round(y) })
  }, canvasRef.current)

  useRelativeMouseMove((x, y) => {
    onMouseMove({ x: Math.round(x), y: Math.round(y) })
  }, canvasRef.current)

  useGlobalHotkey({ key: 'Delete' }, () => {
    deleteSelectedShapes()
  })

  return (
    <div ref={scrollRef} className='overflow-auto border-gray-200'>
      <div
        className='bg-gray-200'
        style={{
          minWidth: `max(100%, ${borderWidth}px)`,
          minHeight: `100%`,
          shapeRendering: 'geometricPrecision',
          paddingLeft: `${padding.left}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingTop: `${padding.top}px`
        }}
      >
        <svg
          style={{
            width: `${canvasWidth + 2}px`,
            height: `${canvasHeight + 2}px`,
            backgroundColor: '#d1d5db'
          }}
        >
          <svg
            ref={canvasRef}
            overflow={'visible'}
            x={1}
            y={1}
            width={canvasWidth}
            height={canvasHeight}
            fill='transparent'
          >
            {/* Render the Grid first */}
            <Grid />
            {/* Render existing shapes on top of the Grid */}
            {shapeIds.map(shapeId => (
              <Shape key={shapeId} shapeId={shapeId} />
            ))}
            {/* Render the preview shape on top of everything */}
            <ToolPreview />
          </svg>
        </svg>
      </div>
    </div>
  )
}

export default CanvasWithWrapper

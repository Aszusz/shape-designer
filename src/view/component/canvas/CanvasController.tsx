import { useStore } from '@/shell/store'
import useGlobalHotkey from '@/view/hooks/useGlobalHotkey'
import useRelativeMouseDown from '@/view/hooks/useRelativeMouseDown'
import useRelativeMouseMove from '@/view/hooks/useRelativeMouseMove'
import useRelativeMouseUp from '@/view/hooks/useRelativeMouseUp'
import { FC, RefObject } from 'react'

interface CanvasControllerProps {
  canvasRef: RefObject<SVGSVGElement>
}

const CanvasController: FC<CanvasControllerProps> = ({ canvasRef }) => {
  const { onMouseDown, onMouseMove, onMouseUp, deleteSelectedShapes } =
    useStore()

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

  return null // This component only controls behavior, no visual output.
}

export default CanvasController

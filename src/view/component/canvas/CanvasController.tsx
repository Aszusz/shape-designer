import { useStore } from '@/shell/store'
import useGlobalHotkey from '@/view/hooks/useGlobalHotkey'
import useRelativeMouseDown from '@/view/hooks/useRelativeMouseDown'
import useRelativeMouseMove from '@/view/hooks/useRelativeMouseMove'
import useRelativeMouseUp from '@/view/hooks/useRelativeMouseUp'
import { FC, useRef } from 'react'

const CanvasController: FC = () => {
  const canvasRef = useRef<SVGSVGElement>(null)

  const { onMouseDown, onMouseMove, onMouseUp, deleteSelectedShapes } =
    useStore()

  useRelativeMouseUp((_x, _y, e) => {
    onMouseUp(e.ctrlKey ? 'toggle' : 'replace')
  }, canvasRef)

  useRelativeMouseDown((x, y) => {
    onMouseDown({ x: Math.round(x), y: Math.round(y) })
  }, canvasRef)

  useRelativeMouseMove((x, y) => {
    onMouseMove({ x: Math.round(x), y: Math.round(y) })
  }, canvasRef)

  useGlobalHotkey({ key: 'Delete' }, () => {
    deleteSelectedShapes()
  })

  return <g ref={canvasRef}></g>
}

export default CanvasController

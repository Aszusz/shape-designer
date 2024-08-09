import useEventListener from './useEventListener'
import { RefObject } from 'react'

type MousePosition = {
  x: number
  y: number
}

type MouseCallback = (pos: MousePosition) => void

const toRelative = (pos: MousePosition, rect: DOMRect): MousePosition => {
  const x = pos.x - rect.left
  const y = pos.y - rect.top
  return { x, y }
}

function useMousePositionRelativeToElement(
  ref: RefObject<HTMLElement>,
  onMouseMove: MouseCallback,
  onMouseDown: MouseCallback,
  onMouseUp: MouseCallback
) {
  const element = ref.current

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      if (element) {
        const rect = element.getBoundingClientRect()
        const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)
        onMouseMove(pos)
      }
    },
    document
  )

  useEventListener(
    'mousedown',
    (event: MouseEvent) => {
      if (element) {
        const rect = element.getBoundingClientRect()
        const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)
        onMouseDown(pos)
      }
    },
    document
  )

  useEventListener(
    'mouseup',
    (event: MouseEvent) => {
      if (element) {
        const rect = element.getBoundingClientRect()
        const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)
        onMouseUp(pos)
      }
    },
    document
  )
}

export default useMousePositionRelativeToElement

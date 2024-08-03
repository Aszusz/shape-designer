import { useEffect, RefObject } from 'react'

type MousePosition = {
  x: number
  y: number
}

type MouseCallback = (pos: MousePosition) => void

const toRelative = (pos: MousePosition, rect: DOMRect) => {
  let x = pos.x - rect.left
  let y = pos.y - rect.top

  if (x < 0) x = -Infinity
  else if (x > rect.width) x = Infinity

  if (y < 0) y = -Infinity
  else if (y > rect.height) y = Infinity

  return { x, y }
}

function useMousePositionRelativeToElement(
  ref: RefObject<HTMLElement>,
  onMouseMove: MouseCallback,
  onMouseDown: MouseCallback,
  onMouseUp: MouseCallback
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!element) return
      const rect = element.getBoundingClientRect()

      const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)

      onMouseMove(pos)
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (!element) return
      const rect = element.getBoundingClientRect()

      const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)

      onMouseDown(pos)
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (!element) return
      const rect = element.getBoundingClientRect()

      const pos = toRelative({ x: event.clientX, y: event.clientY }, rect)

      onMouseUp(pos)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [onMouseDown, onMouseMove, onMouseUp, ref])
}

export default useMousePositionRelativeToElement

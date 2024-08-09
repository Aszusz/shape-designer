import useEventListener from './useEventListener'
import { useState, useCallback, useEffect, RefObject } from 'react'

interface Rect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

function useClientRect(ref: RefObject<HTMLDivElement>): Rect | undefined {
  const [rect, setRect] = useState<Rect | undefined>(undefined)

  const updateRect = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
      })
    }
  }, [ref])

  useEffect(() => {
    updateRect()
  }, [updateRect])

  useEventListener('resize', updateRect, window)

  return rect
}

export default useClientRect

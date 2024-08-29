import useEventListener from './useEventListener'
import { RefObject, useEffect, useRef } from 'react'

function useRelativeMouseMove(
  callback: (x: number, y: number, event: MouseEvent) => void,
  ref: RefObject<HTMLElement | SVGSVGElement | null>
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEventListener(
    'mousemove',
    event => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        callbackRef.current(x, y, event)
      }
    },
    document
  )
}

export default useRelativeMouseMove

import useEventListener from './useEventListener'
import { useEffect, useRef } from 'react'

function useRelativeMouseMove(
  callback: (x: number, y: number, event: MouseEvent) => void,
  element: HTMLElement | null
) {
  const callbackRef = useRef(callback)

  // Update the ref.current value when the callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEventListener(
    'mousemove',
    event => {
      if (element) {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        callbackRef.current(x, y, event)
      }
    },
    document
  )
}

export default useRelativeMouseMove

import { useEffect, useRef } from 'react'

type EventTargetType = Element | Window | Document

type EventMap = ElementEventMap & WindowEventMap & DocumentEventMap

export default function useEventListener<K extends keyof EventMap>(
  eventType: K,
  callback: (event: EventMap[K]) => void,
  element: EventTargetType
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (event: EventMap[K]) => callbackRef.current(event)
    element.addEventListener(eventType, handler as EventListener)

    return () =>
      element.removeEventListener(eventType, handler as EventListener)
  }, [eventType, element])
}

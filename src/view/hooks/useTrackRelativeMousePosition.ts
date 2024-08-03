import { useEffect, RefObject } from 'react'

// Define a type for the callback function
type MousePositionCallback = (position: { x: number; y: number }) => void

// Custom hook
function useMousePositionRelativeToElement(
  ref: RefObject<HTMLElement>, // Ref to the element
  callback: MousePositionCallback // Callback function
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!element) return

      // Get the bounding rectangle of the element
      const rect = element.getBoundingClientRect()

      // Calculate mouse position relative to the element
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top

      // Check if the mouse is outside the element's bounds
      if (x < 0) x = -Infinity
      else if (x > rect.width) x = Infinity

      if (y < 0) y = -Infinity
      else if (y > rect.height) y = Infinity

      // Invoke the callback from the ref with the mouse position
      callback({ x, y })
    }

    // Add the mousemove event listener to the document
    document.addEventListener('mousemove', handleMouseMove)

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [callback, ref]) // Dependency on the element ref
}

export default useMousePositionRelativeToElement

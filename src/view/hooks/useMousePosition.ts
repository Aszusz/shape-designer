import { useState, useEffect } from 'react'

// Define a type for the mouse position
interface MousePosition {
  x: number
  y: number
}

function useMousePosition(): MousePosition {
  // State to store the mouse coordinates
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0
  })

  useEffect(() => {
    // Event handler to update the mouse position state
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      })
    }

    // Add the event listener to the window object
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, []) // Empty dependency array ensures this effect runs only on mount and unmount

  return mousePosition
}

export default useMousePosition

import useEventListener from './useEventListener'
import { useStore } from '@/store'
import { RefObject, useEffect, useState } from 'react'

// Custom hook to calculate paddings
function useDynamicPadding(parentRef: RefObject<HTMLDivElement>) {
  const [padding, setPadding] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  const width = useStore(c => c.canvasSize.width) + 2
  const height = useStore(c => c.canvasSize.height) + 2

  const calculatePadding = () => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect()

      // Calculate available space
      const availableWidth = parentRect.width - width
      const availableHeight = parentRect.height - height

      // Compute padding, set to zero if child is larger
      const topPadding =
        availableHeight > 0 ? Math.ceil(availableHeight / 2) : 0
      const bottomPadding =
        availableHeight > 0 ? Math.floor(availableHeight / 2) : 0
      const leftPadding = availableWidth > 0 ? Math.ceil(availableWidth / 2) : 0
      const rightPadding =
        availableWidth > 0 ? Math.floor(availableWidth / 2) : 0

      setPadding({
        top: topPadding,
        right: rightPadding,
        bottom: bottomPadding,
        left: leftPadding
      })
    }
  }

  useEffect(() => {
    // Calculate padding initially
    calculatePadding()
  }, [parentRef, width, height])

  useEventListener('resize', calculatePadding, window)

  return padding
}

export default useDynamicPadding

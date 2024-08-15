import { Shape } from '@/model/core'
import { useShape, updateShape } from '@/store'
import React, { useCallback, useRef } from 'react'

type ShapeSelectionBoxProps = {
  shapeId: string
}

const OUTER_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_STROKE_COLOR = '#bae6fd'
const RESIZE_HANDLE_FILL_COLOR = 'white'

const OUTER_STROKE_THICKNESS = 2
const STROKE_SPACING = 8
const HANDLE_SIZE = 8

const useResize = (shape: Shape) => {
  const handleIndexRef = useRef<number | null>(null)
  const startXRef = useRef<number | null>(null)
  const startYRef = useRef<number | null>(null)

  const handleMouseDown =
    (index: number) => (event: React.MouseEvent<SVGRectElement>) => {
      event.stopPropagation()

      handleIndexRef.current = index
      startXRef.current = event.clientX
      startYRef.current = event.clientY

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

  const handleMouseMove = (event: MouseEvent) => {
    if (handleIndexRef.current === null) return

    const dx = event.clientX - (startXRef.current ?? 0)
    const dy = event.clientY - (startYRef.current ?? 0)

    const { x, y, width, height } = shape
    let newX = x,
      newY = y,
      newWidth = width,
      newHeight = height

    switch (handleIndexRef.current) {
      case 0: // Top-left
        newWidth -= dx
        newHeight -= dy
        newX += dx
        newY += dy
        break
      case 1: // Top-right
        newWidth += dx
        newHeight -= dy
        newY += dy
        break
      case 2: // Bottom-left
        newWidth -= dx
        newHeight += dy
        newX += dx
        break
      case 3: // Bottom-right
        newWidth += dx
        newHeight += dy
        break
      case 4: // Top-middle
        newHeight -= dy
        newY += dy
        break
      case 5: // Bottom-middle
        newHeight += dy
        break
      case 6: // Left-middle
        newWidth -= dx
        newX += dx
        break
      case 7: // Right-middle
        newWidth += dx
        break
    }

    updateShape({
      ...shape,
      x: Math.max(newX, 0),
      y: Math.max(newY, 0),
      width: Math.max(newWidth, 1),
      height: Math.max(newHeight, 1)
    })
  }

  const handleMouseUp = () => {
    handleIndexRef.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return handleMouseDown
}

const ShapeSelectionBox = ({ shapeId }: ShapeSelectionBoxProps) => {
  const shape = useShape(shapeId)

  const memoizedUseResize = useCallback(useResize, [])

  if (!shape || !shape.isSelected) return null

  const halfHandleSize = HANDLE_SIZE / 2
  const handleOffset =
    OUTER_STROKE_THICKNESS + STROKE_SPACING + halfHandleSize - 1

  const handleMouseDown = memoizedUseResize(shape)

  const handles = [
    { x: shape.x - handleOffset, y: shape.y - handleOffset }, // Top-left
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y - handleOffset
    }, // Top-right
    {
      x: shape.x - handleOffset,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-left
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-right
    {
      x: shape.x + shape.width / 2 - halfHandleSize,
      y: shape.y - handleOffset
    }, // Top-middle
    {
      x: shape.x + shape.width / 2 - halfHandleSize,
      y: shape.y + shape.height + handleOffset - HANDLE_SIZE
    }, // Bottom-middle
    {
      x: shape.x - handleOffset,
      y: shape.y + shape.height / 2 - halfHandleSize
    }, // Left-middle
    {
      x: shape.x + shape.width + handleOffset - HANDLE_SIZE,
      y: shape.y + shape.height / 2 - halfHandleSize
    } // Right-middle
  ]

  return (
    <>
      <rect
        x={shape.x - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
        y={shape.y - OUTER_STROKE_THICKNESS / 2 - STROKE_SPACING}
        width={shape.width + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
        height={shape.height + OUTER_STROKE_THICKNESS + 2 * STROKE_SPACING}
        stroke={OUTER_STROKE_COLOR}
        fill='none'
        strokeWidth={OUTER_STROKE_THICKNESS}
      />

      {handles.map((handle, index) => (
        <rect
          key={index}
          x={handle.x}
          y={handle.y}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={RESIZE_HANDLE_FILL_COLOR}
          stroke={RESIZE_HANDLE_STROKE_COLOR}
          strokeWidth={1}
          onMouseDown={handleMouseDown(index)}
        />
      ))}
    </>
  )
}

export default ShapeSelectionBox

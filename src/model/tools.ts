import { BoundingBox, isContained } from './geometry'
import { ReadonlyOrderedRecord } from './readonlyOrderedRecord'
import * as record from './readonlyOrderedRecord'
import { nanoid } from 'nanoid'

// Tool and Shape Constants
export const SelectTool = 'select_tool'
export const PanTool = 'pan_tool'
export const RectangleTool = 'rectangle_tool'
export const EllipseTool = 'ellipse_tool'

export type ToolType =
  | typeof SelectTool
  | typeof PanTool
  | typeof RectangleTool
  | typeof EllipseTool

export type SelectionToolMode = 'replace' | 'toggle'

export const RectangleShape = 'rectangle_shape'
export const EllipseShape = 'ellipse_shape'

export type ShapeType = typeof RectangleShape | typeof EllipseShape

export type ShapeColor = {
  readonly color: string
  readonly borderColor: string
}

export type Shape = {
  readonly id: string
  readonly type: ShapeType
  readonly isSelected: boolean
} & BoundingBox &
  ShapeColor

// Tool and Shape Functions
export const handlePanTool = (
  shapes: ReadonlyOrderedRecord<Shape>
): ReadonlyOrderedRecord<Shape> => {
  // Clear dragStart for PanTool
  return shapes
}

export const handleSelectTool = (
  shapes: ReadonlyOrderedRecord<Shape>,
  selectionBox: BoundingBox,
  selectionMode: SelectionToolMode
): ReadonlyOrderedRecord<Shape> => {
  if (selectionBox.width < 1 || selectionBox.height < 1) {
    // This is a click, not an area selection
    const updatedShapes = record.map(shapes, shape => {
      const isShapeSelected = isContained(selectionBox, shape)

      if (selectionMode === 'replace') {
        return { ...shape, isSelected: isShapeSelected }
      } else if (selectionMode === 'toggle') {
        return {
          ...shape,
          isSelected: isShapeSelected ? !shape.isSelected : shape.isSelected
        }
      } else {
        return shape // Fallback to return the original shape if selectionMode is unexpected
      }
    })

    return updatedShapes
  }

  // Handle area selection
  const updatedShapes = record.map(shapes, shape => {
    const isShapeSelected = isContained(shape, selectionBox)

    if (selectionMode === 'replace') {
      return { ...shape, isSelected: isShapeSelected }
    } else if (selectionMode === 'toggle') {
      return {
        ...shape,
        isSelected: isShapeSelected ? !shape.isSelected : shape.isSelected
      }
    } else {
      return shape // Fallback to return the original shape if selectionMode is unexpected
    }
  })

  // Clear dragStart for SelectTool
  return updatedShapes
}

export const handleShapeTool = (
  shapes: ReadonlyOrderedRecord<Shape>,
  shapeBox: BoundingBox,
  shapeType: ShapeType
): ReadonlyOrderedRecord<Shape> => {
  if (shapeBox.width < 5 || shapeBox.height < 5) {
    return shapes
  }

  const deselectedShapes = record.map(shapes, shape => ({
    ...shape,
    isSelected: false
  }))

  const newShape: Shape = {
    id: nanoid(),
    type: shapeType,
    isSelected: true,
    x: shapeBox.x,
    y: shapeBox.y,
    width: shapeBox.width,
    height: shapeBox.height,
    color: '#ffffff',
    borderColor: '#000000'
  }

  return record.set(deselectedShapes, newShape.id, newShape)
}

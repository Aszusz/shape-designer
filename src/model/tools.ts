import { Shape, ShapeType } from './core'
import { BoundingBox, isContained } from './geometry'
import { ReadonlyOrderedRecord } from './readonlyOrderedRecord'
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
    const updatedShapes = shapes.map(shape => {
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
  const updatedShapes = shapes.map(shape => {
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

  const newShape: Shape = {
    id: nanoid(),
    type: shapeType,
    isSelected: false,
    x: shapeBox.x,
    y: shapeBox.y,
    width: shapeBox.width,
    height: shapeBox.height,
    color: '#ffffff'
  }

  return shapes.set(newShape.id, newShape)
}

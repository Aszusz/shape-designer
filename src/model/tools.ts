import { Shape, ShapeType, State } from './core'
import { boundingBox, isContained } from './geometry'
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

export const handlePanTool = (state: State): State => {
  // Clear dragStart for PanTool
  return { ...state, dragStart: undefined }
}

export const handleSelectTool = (
  currentState: State,
  selectionMode: SelectionToolMode
): State => {
  if (currentState.dragStart === undefined) {
    return currentState
  }

  const shapes = currentState.shapes
  const selectionBox = boundingBox(
    currentState.dragStart,
    currentState.currentMousePosition
  )

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

    return { ...currentState, shapes: updatedShapes, dragStart: undefined }
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
  return { ...currentState, dragStart: undefined, shapes: updatedShapes }
}

export const handleShapeTool = (state: State, shapeType: ShapeType): State => {
  if (state.dragStart === undefined) {
    return state
  }

  const bb = boundingBox(state.dragStart, state.currentMousePosition)

  if (bb.width < 5 || bb.height < 5) {
    return { ...state, dragStart: undefined }
  }

  const newShape: Shape = {
    id: nanoid(),
    type: shapeType,
    isSelected: false,
    x: bb.x,
    y: bb.y,
    width: bb.width,
    height: bb.height
  }

  return {
    ...state,
    dragStart: undefined,
    shapes: state.shapes.set(newShape.id, newShape)
  }
}

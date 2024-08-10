import {
  BoundingBox,
  Point,
  Size,
  boundingBox,
  intersection,
  isContained,
  isIn,
  limitTo,
  snapToGrid
} from './geometry'
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

export const RectangleShape = 'rectangle_shape'
export const EllipseShape = 'ellipse_shape'

export type ShapeType = typeof RectangleShape | typeof EllipseShape

export type Shape = {
  readonly id: string
  readonly type: ShapeType
  readonly isSelected: boolean
} & BoundingBox

export type State = {
  readonly toolType: ToolType
  readonly canvasSize: Size
  readonly dragStart?: Point
  readonly currentMousePosition: Point
  readonly shapes: ReadonlyOrderedRecord<Shape>
}

export const initialState: State = {
  toolType: SelectTool,
  canvasSize: { width: 800, height: 600 },
  dragStart: undefined,
  currentMousePosition: { x: NaN, y: NaN },
  shapes: new ReadonlyOrderedRecord()
}

// Selectors
export const getPreview = (state: State) => {
  if (state.toolType === PanTool || state.dragStart === undefined) {
    return undefined
  }

  const preview = boundingBox(state.dragStart, state.currentMousePosition)
  const canvas = {
    x: 0,
    y: 0,
    width: state.canvasSize.width - 1,
    height: state.canvasSize.height - 1
  }
  return intersection(preview, canvas)
}

export const getBorderSize = (state: State): Size => ({
  width: state.canvasSize.width + 2,
  height: state.canvasSize.height + 2
})

// State Manipulation Functions
export const setCanvasSize = (state: State, size: Size): State => ({
  ...state,
  canvasSize: size
})

export const setTool = (state: State, tool: ToolType): State => ({
  ...state,
  toolType: tool
})

export const onMouseMove = (state: State, mousePosition: Point): State => {
  const canvas = {
    x: 0,
    y: 0,
    width: state.canvasSize.width,
    height: state.canvasSize.height
  }

  const limitedPosition = limitTo(mousePosition, canvas)
  const snappedPosition = snapToGrid(limitedPosition, 10)

  switch (state.toolType) {
    case PanTool:
      return state
    case SelectTool:
      return { ...state, currentMousePosition: limitedPosition }
    case RectangleTool: {
      return { ...state, currentMousePosition: snappedPosition }
    }
    case EllipseTool: {
      return { ...state, currentMousePosition: snappedPosition }
    }
    default:
      return state
  }
}

export const onMouseDown = (state: State, mousePosition: Point): State => {
  const canvas = {
    x: 0,
    y: 0,
    width: state.canvasSize.width,
    height: state.canvasSize.height
  }

  if (!isIn(mousePosition, canvas)) {
    return state
  }

  const snappedPosition = snapToGrid(mousePosition, 10)

  switch (state.toolType) {
    case PanTool:
      return state
    case SelectTool:
      return { ...state, dragStart: mousePosition }
    case RectangleTool:
      return { ...state, dragStart: snappedPosition }
    case EllipseTool:
      return { ...state, dragStart: snappedPosition }
    default:
      return state
  }
}

export const onMouseUp = (state: State): State => {
  if (state.dragStart === undefined) {
    return state
  }

  switch (state.toolType) {
    case PanTool:
      return handlePanTool(state)
    case SelectTool:
      return handleSelectTool(state)
    case RectangleTool:
      return handleShapeTool(state, RectangleShape)
    case EllipseTool:
      return handleShapeTool(state, EllipseShape)
    default:
      return state
  }
}

const handlePanTool = (state: State): State => {
  // Clear dragStart for PanTool
  return { ...state, dragStart: undefined }
}

const handleSelectTool = (state: State): State => {
  if (state.dragStart === undefined) {
    return state
  }
  const allShapes = state.shapes

  const bb = boundingBox(state.dragStart, state.currentMousePosition)

  const newShapes = allShapes.map(shape =>
    isContained(shape, bb)
      ? { ...shape, isSelected: true }
      : { ...shape, isSelected: false }
  )

  // Clear dragStart for SelectTool
  return { ...state, dragStart: undefined, shapes: newShapes }
}

const handleShapeTool = (state: State, shapeType: ShapeType): State => {
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

export const deselectAllShapes = (state: State): State => {
  const shapes = state.shapes.map(shape => ({ ...shape, isSelected: false }))
  return { ...state, shapes }
}

export const selectShape = (state: State, shapeId: string): State => {
  const shapes = state.shapes.map(shape => ({
    ...shape,
    isSelected: shape.id === shapeId
  }))
  return { ...state, shapes }
}

export const toggleSelected = (state: State, shapeId: string): State => {
  const shapes = state.shapes.map(shape =>
    shape.id === shapeId ? { ...shape, isSelected: !shape.isSelected } : shape
  )
  return { ...state, shapes }
}

export const getSelectedShapes = (state: State): Shape[] => {
  return state.shapes.values().filter(shape => shape.isSelected)
}

export const updateShape = (state: State, shape: Shape): State => {
  return { ...state, shapes: state.shapes.set(shape.id, shape) }
}

import {
  BoundingBox,
  Point,
  Size,
  boundingBox,
  intersection,
  isIn,
  limitTo,
  snapToGrid
} from './geometry'
import { ReadonlyOrderedRecord } from './readonlyOrderedRecord'
import {
  EllipseTool,
  handlePanTool,
  handleSelectTool,
  handleShapeTool,
  PanTool,
  RectangleTool,
  SelectionToolMode,
  SelectTool,
  ToolType
} from './tools'

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
  readonly snapToGridSetting: boolean
}

export const initialState: State = {
  toolType: SelectTool,
  canvasSize: { width: 800, height: 600 },
  dragStart: undefined,
  currentMousePosition: { x: NaN, y: NaN },
  shapes: new ReadonlyOrderedRecord(),
  snapToGridSetting: false
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
      return {
        ...state,
        currentMousePosition: state.snapToGridSetting
          ? snappedPosition
          : limitedPosition
      }
    }
    case EllipseTool: {
      return {
        ...state,
        currentMousePosition: state.snapToGridSetting
          ? snappedPosition
          : limitedPosition
      }
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
      return {
        ...state,
        dragStart: state.snapToGridSetting ? snappedPosition : mousePosition
      }
    case EllipseTool:
      return {
        ...state,
        dragStart: state.snapToGridSetting ? snappedPosition : mousePosition
      }
    default:
      return state
  }
}

export const onMouseUp = (
  state: State,
  mode: SelectionToolMode = 'replace'
): State => {
  if (state.dragStart === undefined) {
    return state
  }

  const bb = boundingBox(state.dragStart, state.currentMousePosition)
  let updatedShapes: ReadonlyOrderedRecord<Shape>

  switch (state.toolType) {
    case PanTool:
      updatedShapes = handlePanTool(state.shapes)
      break
    case SelectTool:
      updatedShapes = handleSelectTool(state.shapes, bb, mode)
      break
    case RectangleTool:
      updatedShapes = handleShapeTool(state.shapes, bb, RectangleShape)
      break
    case EllipseTool:
      updatedShapes = handleShapeTool(state.shapes, bb, EllipseShape)
      break
    default:
      updatedShapes = state.shapes
  }

  return {
    ...state,
    dragStart: undefined,
    shapes: updatedShapes
  }
}

export const selectShape = (state: State, shapeId: string): State => {
  const shapes = state.shapes.map(shape => ({
    ...shape,
    isSelected: shape.id === shapeId
  }))
  return { ...state, shapes }
}

export const toggleSelected = (state: State, shapeId: string): State => {
  const oldShapes = state.shapes
  const newShapes = oldShapes.map(shape =>
    shape.id === shapeId ? { ...shape, isSelected: !shape.isSelected } : shape
  )
  return { ...state, shapes: newShapes }
}

export const getSelectedShapes = (state: State): Shape[] => {
  return state.shapes.values().filter(shape => shape.isSelected)
}

export const updateShape = (state: State, shape: Shape): State => {
  return { ...state, shapes: state.shapes.set(shape.id, shape) }
}

export const setSnapToGridSetting = (
  state: State,
  snapToGridSetting: boolean
): State => {
  return { ...state, snapToGridSetting }
}

export const deleteSelectedShapes = (state: State): State => {
  return {
    ...state,
    shapes: state.shapes.filter(shape => !shape.isSelected)
  }
}

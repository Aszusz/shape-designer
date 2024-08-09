import {
  BoundingBox,
  Point,
  Size,
  boundingBox,
  intersection,
  isIn,
  limitTo
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
  const adjustedPosition = limitTo(mousePosition, {
    x: 0,
    y: 0,
    width: state.canvasSize.width,
    height: state.canvasSize.height
  })
  return { ...state, currentMousePosition: adjustedPosition }
}

export const onMouseDown = (state: State, mousePosition: Point): State =>
  isIn(mousePosition, {
    x: 0,
    y: 0,
    width: state.canvasSize.width,
    height: state.canvasSize.height
  })
    ? { ...state, dragStart: mousePosition }
    : state

export const onMouseUp = (state: State): State => {
  if (state.dragStart === undefined) {
    return state
  }

  if (state.toolType === PanTool || state.toolType === SelectTool) {
    return { ...state, dragStart: undefined }
  }

  const bb = boundingBox(state.dragStart, state.currentMousePosition)

  if (bb.width < 5 || bb.height < 5) {
    return { ...state, dragStart: undefined }
  }

  const newShape: Shape = {
    id: nanoid(),
    type: state.toolType === RectangleTool ? RectangleShape : EllipseShape,
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
  const deselectedState = deselectAllShapes(state)
  const shape = deselectedState.shapes.get(shapeId)
  if (shape === undefined) {
    return deselectedState
  }
  return {
    ...deselectedState,
    shapes: deselectedState.shapes.set(shapeId, { ...shape, isSelected: true })
  }
}
export function getSelectedShapes(state: State): Shape[] {
  return state.shapes.values().filter(shape => shape.isSelected)
}

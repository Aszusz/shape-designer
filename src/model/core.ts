import {
  Point,
  Size,
  boundingBox,
  intersection,
  isIn,
  limitTo,
  snapToGrid
} from './geometry'
import {
  createReadonlyOrderedRecord,
  filter,
  map,
  ReadonlyOrderedRecord,
  set as setRecord,
  values
} from './readonlyOrderedRecord'
import {
  EllipseShape,
  EllipseTool,
  handlePanTool,
  handleSelectTool,
  handleShapeTool,
  PanTool,
  RectangleShape,
  RectangleTool,
  SelectionToolMode,
  SelectTool,
  Shape,
  ToolType,
  ShapeType
} from './tools'
import { nanoid } from 'nanoid'

export function generateId(): string {
  return nanoid()
}

export type PersistentState = {
  readonly canvasSize: Size
  readonly shapes: ReadonlyOrderedRecord<Shape>
  readonly snapToGridSetting: boolean
}

export type VolatileState = {
  readonly toolType: ToolType
  readonly dragStart?: Point
  readonly currentMousePosition: Point
}

export type State = PersistentState & VolatileState

export function splitState(state: State): {
  persistent: PersistentState
  volatile: VolatileState
} {
  const { canvasSize, shapes, snapToGridSetting, ...volatileState } = state
  const persistentState: PersistentState = {
    canvasSize,
    shapes,
    snapToGridSetting
  }
  return {
    persistent: persistentState,
    volatile: volatileState as VolatileState
  }
}

export function combineState(
  persistent: PersistentState,
  volatile: VolatileState
): State {
  return {
    ...persistent,
    ...volatile
  }
}

export const initialState: State = {
  toolType: SelectTool,
  canvasSize: { width: 800, height: 600 },
  dragStart: undefined,
  currentMousePosition: { x: NaN, y: NaN },
  shapes: createReadonlyOrderedRecord<Shape>(),
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
  const shapes = map(state.shapes, shape => ({
    ...shape,
    isSelected: shape.id === shapeId
  }))
  return { ...state, shapes }
}

export const toggleSelected = (state: State, shapeId: string): State => {
  const oldShapes = state.shapes
  const newShapes = map(oldShapes, shape =>
    shape.id === shapeId ? { ...shape, isSelected: !shape.isSelected } : shape
  )
  return { ...state, shapes: newShapes }
}

export const getSelectedShapes = (state: State): Shape[] => {
  return values(state.shapes).filter(shape => shape.isSelected)
}

export const updateShape = (state: State, shape: Shape): State => {
  return { ...state, shapes: set(state.shapes, shape.id, shape) }
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
    shapes: filter(state.shapes, shape => !shape.isSelected)
  }
}

export function serializeShapes(shapes: Shape[]): string {
  return JSON.stringify(shapes)
}
export function deserializeShapes(serialized: string): Shape[] {
  const parsed = JSON.parse(serialized)
  return parsed.map((shape: any) => {
    // Ensure each shape has a valid ID
    const id = shape.id || generateId()

    // Validate shape type
    const type: ShapeType =
      shape.type === RectangleShape || shape.type === EllipseShape
        ? shape.type
        : RectangleShape // Default to rectangle if type is invalid

    // Reconstruct the shape with validated properties
    return {
      id,
      type,
      x: Number(shape.x) || 0,
      y: Number(shape.y) || 0,
      width: Number(shape.width) || 0,
      height: Number(shape.height) || 0,
      color: shape.color || '#ffffff',
      borderColor: shape.borderColor || '#000000',
      isSelected: Boolean(shape.isSelected)
    }
  })
}
export function copyShapes(shapes: Shape[]): string {
  return serializeShapes(shapes)
}
export function pasteShapes(
  serializedShapes: string,
  existingShapes: ReadonlyOrderedRecord<Shape>
): ReadonlyOrderedRecord<Shape> {
  const newShapes = deserializeShapes(serializedShapes)
  return newShapes.reduce((shapes, shape) => {
    const newShape = {
      ...shape,
      id: generateId(),
      x: shape.x + 10,
      y: shape.y + 10,
      isSelected: true
    }
    return setRecord(shapes, newShape.id, newShape)
  }, existingShapes)
}

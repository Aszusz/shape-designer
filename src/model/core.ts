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
  set,
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
  ToolType
} from './tools'

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

const persistentKeys = ['canvasSize', 'shapes', 'snapToGridSetting'] as const

export function narrowToPersistentState(state: State) {
  return Object.fromEntries(persistentKeys.map(key => [key, state[key]]))
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

import { initialState, Shape, State, ToolType } from './model/canvas'
import {
  boundingBox,
  intersection,
  isIn,
  limitTo,
  Point
} from './model/geometry'
import { nanoid } from 'nanoid'
import { create } from 'zustand'

export const useStore = create(() => initialState)

// Selectors

export const previewSelector = (state: State) => {
  if (state.toolType === 'pan_tool') {
    return undefined
  }
  if (state.dragStart === undefined) {
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

// Actions
export const setCanvasWidth = (canvasWidth: number) => {
  useStore.setState(s => ({
    canvasSize: { ...s.canvasSize, width: canvasWidth }
  }))
}

export const setCanvasHeight = (canvasHeight: number) => {
  useStore.setState(s => ({
    canvasSize: { ...s.canvasSize, height: canvasHeight }
  }))
}

export const setTool = (tool: ToolType) => {
  useStore.setState({ toolType: tool })
}

export const onMouseMove = (mousePosition: Point) => {
  useStore.setState(state => {
    const adjustedPosition = limitTo(mousePosition, {
      x: 0,
      y: 0,
      width: state.canvasSize.width,
      height: state.canvasSize.height
    })
    return { ...state, currentMousePosition: adjustedPosition }
  })
}

export const onMouseDown = (mousePosition: { x: number; y: number }) => {
  useStore.setState(state => {
    return isIn(mousePosition, {
      x: 0,
      y: 0,
      width: state.canvasSize.width,
      height: state.canvasSize.height
    })
      ? { ...state, dragStart: mousePosition }
      : state
  })
}

export const onMouseUp = () => {
  useStore.setState(state => {
    if (state.dragStart === undefined) {
      return state
    }

    if (state.toolType === 'pan_tool') {
      return { ...state, dragStart: undefined }
    }
    if (state.toolType === 'select_tool') {
      return { ...state, dragStart: undefined }
    }

    const bb = boundingBox(state.dragStart, state.currentMousePosition)

    if (bb.width < 5 || bb.height < 5) {
      return { ...state, dragStart: undefined }
    }

    const newShape: Shape = {
      id: nanoid(),
      type:
        state.toolType === 'rectangle_tool'
          ? 'rectangle_shape'
          : 'ellipse_shape',
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
  })
}

export const deselectAllShapes = () => {
  useStore.setState(state => {
    const shapes = state.shapes.map(shape => {
      return { ...shape, isSelected: false }
    })
    return { ...state, shapes }
  })
}

export const selectShape = (shapeId: string) => {
  deselectAllShapes()

  useStore.setState(state => {
    const shape = state.shapes.get(shapeId)
    if (shape === undefined) {
      return state
    }
    return {
      ...state,
      shapes: state.shapes.set(shapeId, { ...shape, isSelected: true })
    }
  })
}

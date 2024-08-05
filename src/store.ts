import {
  boundingBox,
  initialState,
  intersection,
  Point,
  State,
  ToolType
} from './model/canvas'
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
  useStore.setState({ currentMousePosition: mousePosition })
}

export const onMouseDown = (mousePosition: { x: number; y: number }) => {
  if (isFinite(mousePosition.x) && isFinite(mousePosition.y)) {
    useStore.setState({ dragStart: mousePosition })
  }
}

export const onMouseUp = () => {
  useStore.setState({ dragStart: undefined })
}

import { initialState, State, Tool } from './types'
import { create } from 'zustand'

export const useStore = create(() => initialState)

// Selectors

export const previewSelector = (state: State) => {
  if (state.tool !== 'select') {
    return undefined
  }
  if (state.dargStart === undefined) {
    return undefined
  }

  // Destructure drag start point and mouse position
  const { x: startX, y: startY } = state.dargStart
  let { x: mouseX, y: mouseY } = state.mousePosition

  // Clamp mouseX to canvas boundaries
  if (mouseX === Infinity) {
    mouseX = state.canvasWidth
  } else if (mouseX === -Infinity) {
    mouseX = 0
  } else {
    mouseX = Math.min(Math.max(mouseX, 0), state.canvasWidth)
  }

  // Clamp mouseY to canvas boundaries
  if (mouseY === Infinity) {
    mouseY = state.canvasHeight
  } else if (mouseY === -Infinity) {
    mouseY = 0
  } else {
    mouseY = Math.min(Math.max(mouseY, 0), state.canvasHeight)
  }

  // Calculate the top-left corner of the rectangle
  const rectX = Math.min(startX, mouseX)
  const rectY = Math.min(startY, mouseY)

  // Calculate the width and height of the rectangle
  const width = Math.abs(startX - mouseX)
  const height = Math.abs(startY - mouseY)

  // Return the rectangle's properties
  return { x: rectX, y: rectY, width, height }
}

// Actions
export const setCanvasWidth = (canvasWidth: number) => {
  useStore.setState({ canvasWidth })
}

export const setCanvasHeight = (canvasHeight: number) => {
  useStore.setState({ canvasHeight })
}

export const setTool = (tool: Tool) => {
  useStore.setState({ tool })
}

export const onMouseMove = (mousePosition: { x: number; y: number }) => {
  useStore.setState({ mousePosition })
}

export const onMouseDown = (mousePosition: { x: number; y: number }) => {
  if (isFinite(mousePosition.x) && isFinite(mousePosition.y)) {
    useStore.setState({ dargStart: mousePosition })
  }
}

export const onMouseUp = () => {
  useStore.setState({ dargStart: undefined })
}

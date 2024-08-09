import * as core from './model/core'
import { Point, Size } from './model/geometry'
import { create } from 'zustand'

export const useStore = create(() => core.initialState)

// Selectors
export const previewSelector = (state: core.State) => core.getPreview(state)

// Actions
export const setCanvasSize = (size: Size) => {
  useStore.setState(state => core.setCanvasSize(state, size))
}

export const setTool = (tool: core.ToolType) => {
  useStore.setState(state => core.setTool(state, tool))
}

export const onMouseMove = (mousePosition: Point) => {
  useStore.setState(state => core.onMouseMove(state, mousePosition))
}

export const onMouseDown = (mousePosition: Point) => {
  useStore.setState(state => core.onMouseDown(state, mousePosition))
}

export const onMouseUp = () => {
  useStore.setState(state => core.onMouseUp(state))
}

export const deselectAllShapes = () => {
  useStore.setState(state => core.deselectAllShapes(state))
}

export const selectShape = (shapeId: string) => {
  useStore.setState(state => core.selectShape(state, shapeId))
}

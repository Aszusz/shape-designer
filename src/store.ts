import * as core from './model/core'
import { Point, Size } from './model/geometry'
import { create } from 'zustand'

const useStore = create(() => core.initialState)

// Selectors

export const useCanvasSize = () => useStore(state => state.canvasSize)

export const useCanvasBorderSize = () =>
  useStore(state => core.getBorderSize(state))

export const useToolType = () => useStore(state => state.toolType)

export const useMousePosition = () =>
  useStore(state => state.currentMousePosition)

export const useToolPreview = () => useStore(state => core.getPreview(state))

export const useShapeIds = () => useStore(state => state.shapes.getOrder())

export const useShape = (shapeId: string) =>
  useStore(state => state.shapes.get(shapeId))

export const useSelectedShapes = () =>
  useStore(state => core.getSelectedShapes(state))

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

export const toggleSelected = (shapeId: string) => {
  useStore.setState(state => core.toggleSelected(state, shapeId))
}

export const updateShape = (shape: core.Shape) => {
  useStore.setState(state => core.updateShape(state, shape))
}

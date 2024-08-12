import * as core from './model/core'
import { SelectionToolMode } from './model/core'
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

export const useSnapToGridSetting = () =>
  useStore(state => state.snapToGridSetting)

// Actions

export const setCanvasSize = (size: Size) => {
  console.log('setCanvasSize', size)
  useStore.setState(state => core.setCanvasSize(state, size))
}

export const setTool = (tool: core.ToolType) => {
  console.log('setTool', tool)
  useStore.setState(state => core.setTool(state, tool))
}

export const onMouseMove = (mousePosition: Point) => {
  useStore.setState(state => core.onMouseMove(state, mousePosition))
}

export const onMouseDown = (mousePosition: Point) => {
  console.log('onMouseDown', mousePosition)
  useStore.setState(state => core.onMouseDown(state, mousePosition))
}

export const onMouseUp = (mode: SelectionToolMode) => {
  console.log('onMouseUp')
  useStore.setState(state => core.onMouseUp(state, mode))
}

export const selectShape = (shapeId: string) => {
  console.log('selectShape', shapeId)
  useStore.setState(state => core.selectShape(state, shapeId))
}

export const toggleSelected = (shapeId: string) => {
  console.log('toggleSelected', shapeId)
  useStore.setState(state => core.toggleSelected(state, shapeId))
}

export const updateShape = (shape: core.Shape) => {
  console.log('updateShape', shape)
  useStore.setState(state => core.updateShape(state, shape))
}

export const setSnapToGridSetting = (snapToGrid: boolean) => {
  console.log('setSnapToGridSetting', snapToGrid)
  useStore.setState(state => core.setSnapToGridSetting(state, snapToGrid))
}

export const deleteSelectedShapes = () => {
  console.log('deleteSelectedShapes')
  useStore.setState(state => core.deleteSelectedShapes(state))
}

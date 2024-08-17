import * as core from '../model/core'
import { Point, Size } from '../model/geometry'
import { SelectionToolMode, ToolType } from '../model/tools'
import { IStore } from './istore'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create<IStore>()(
  devtools((set, get) => ({
    // State
    ...core.initialState,

    // Computed selectors
    getCanvasBorderSize: () => core.getBorderSize(get()),
    getToolPreview: () => core.getPreview(get()),
    getShapeIds: () => get().shapes.getOrder(),
    getShape: (shapeId: string) => get().shapes.get(shapeId),
    getSelectedShapes: () => core.getSelectedShapes(get()),

    // Actions
    setCanvasSize: (size: Size) => {
      set(state => ({ ...core.setCanvasSize(state, size) })),
        undefined,
        'setCanvasSize'
    },

    setTool: (tool: ToolType) => {
      set(state => ({ ...core.setTool(state, tool) }), undefined, 'setTool')
    },

    onMouseMove: (mousePosition: Point) => {
      set(state => ({ ...core.onMouseMove(state, mousePosition) }))
      // Skip logging for this action
    },

    onMouseDown: (mousePosition: Point) => {
      set(
        state => ({ ...core.onMouseDown(state, mousePosition) }),
        undefined,
        'onMouseDown'
      )
    },

    onMouseUp: (mode: SelectionToolMode) => {
      set(state => ({ ...core.onMouseUp(state, mode) }), undefined, 'onMouseUp')
    },

    selectShape: (shapeId: string) => {
      set(
        state => ({ ...core.selectShape(state, shapeId) }),
        undefined,
        'selectShape'
      )
    },

    toggleSelected: (shapeId: string) => {
      set(
        state => ({ ...core.toggleSelected(state, shapeId) }),
        undefined,
        'toggleSelected'
      )
    },

    updateShape: (shape: core.Shape) => {
      set(
        state => ({ ...core.updateShape(state, shape) }),
        undefined,
        'updateShape'
      )
    },

    setSnapToGridSetting: (snapToGrid: boolean) => {
      set(
        state => ({ ...core.setSnapToGridSetting(state, snapToGrid) }),
        undefined,
        'setSnapToGridSetting'
      )
    },

    deleteSelectedShapes: () => {
      set(
        state => ({ ...core.deleteSelectedShapes(state) }),
        undefined,
        'deleteSelectedShapes'
      )
    }
  }))
)

import * as core from '../model/core'
import type { Shape } from '../model/core'
import { BoundingBox, Point, Size } from '../model/geometry'
import { ReadonlyOrderedRecord } from '../model/readonlyOrderedRecord'
import { SelectionToolMode, ToolType } from '../model/tools'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreState {
  // State
  canvasSize: Size
  toolType: ToolType
  currentMousePosition: Point
  snapToGridSetting: boolean
  shapes: ReadonlyOrderedRecord<Shape>

  // Computed selectors
  getCanvasBorderSize: () => Size
  getToolPreview: () => BoundingBox | null | undefined
  getShapeIds: () => string[]
  getShape: (shapeId: string) => Shape | undefined
  getSelectedShapes: () => Shape[]

  // Actions
  setCanvasSize: (size: Size) => void
  setTool: (tool: ToolType) => void
  onMouseMove: (mousePosition: Point) => void
  onMouseDown: (mousePosition: Point) => void
  onMouseUp: (mode: SelectionToolMode) => void
  selectShape: (shapeId: string) => void
  toggleSelected: (shapeId: string) => void
  updateShape: (shape: core.Shape) => void
  setSnapToGridSetting: (snapToGrid: boolean) => void
  deleteSelectedShapes: () => void
}

export const useStore = create<StoreState>()(
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

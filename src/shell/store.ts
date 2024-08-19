import { clipboardManager } from '@/model/clipboardManager'
import * as core from '@/model/core'
import { Point, Size } from '@/model/geometry'
import {
  createInitialHistory,
  addToHistory,
  undo as undoHistory,
  redo as redoHistory
} from '@/model/history'
import * as record from '@/model/readonlyOrderedRecord'
import { SelectionToolMode, ToolType, Shape } from '@/model/tools'
import { IStore } from '@/shell/istore'
import { create } from 'zustand'

const initialState = core.initialState

export const useStore = create<IStore>()((set, get) => ({
  // History State
  history: createInitialHistory(initialState),
  clipboard: null,
  copySelectedShapes: () => {
    const selectedShapes = get().getSelectedShapes()
    if (selectedShapes.length > 0) {
      clipboardManager.copy(selectedShapes)
      set(state => {
        const deselectedShapes = core.deselectAllShapes(
          state.history.present.shapes
        )
        return {
          history: addToHistory(state.history, {
            ...state.history.present,
            shapes: deselectedShapes
          })
        }
      })
    }
  },

  pasteShapes: () => {
    const pastedShapes = clipboardManager.paste()
    if (pastedShapes) {
      set(state => {
        const { updatedShapes, newShapeIds } = core.pasteShapes(
          pastedShapes,
          state.history.present.shapes
        )

        // Select only the newly pasted shapes
        const shapesWithSelection = core.selectShapes(
          updatedShapes,
          newShapeIds
        )

        const newPresent = {
          ...state.history.present,
          shapes: shapesWithSelection
        }

        return {
          history: addToHistory(state.history, newPresent)
        }
      })
    }
  },

  // Computed selectors
  getCanvasBorderSize: () => core.getBorderSize(get().history.present),
  getToolPreview: () => core.getPreview(get().history.present),
  getShapeIds: () => record.getOrder(get().history.present.shapes),
  getShape: (shapeId: string) =>
    record.get(get().history.present.shapes, shapeId),
  getSelectedShapes: () => core.getSelectedShapes(get().history.present),

  // Actions
  setCanvasSize: (size: Size) => {
    set(state => {
      const newPresent = { ...core.setCanvasSize(state.history.present, size) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  setTool: (tool: ToolType) => {
    set(state => {
      const newPresent = { ...core.setTool(state.history.present, tool) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  onMouseMove: (mousePosition: Point) => {
    set(state => {
      const newPresent = {
        ...core.onMouseMove(state.history.present, mousePosition)
      }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  onMouseDown: (mousePosition: Point) => {
    set(state => {
      const newPresent = {
        ...core.onMouseDown(state.history.present, mousePosition)
      }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  onMouseUp: (mode: SelectionToolMode) => {
    set(state => {
      const newPresent = { ...core.onMouseUp(state.history.present, mode) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  selectShape: (shapeId: string) => {
    set(state => {
      const newPresent = { ...core.selectShape(state.history.present, shapeId) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  toggleSelected: (shapeId: string) => {
    set(state => {
      const newPresent = {
        ...core.toggleSelected(state.history.present, shapeId)
      }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  updateShape: (shape: Shape) => {
    set(state => {
      const newPresent = { ...core.updateShape(state.history.present, shape) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  setSnapToGridSetting: (snapToGrid: boolean) => {
    set(state => {
      const newPresent = {
        ...core.setSnapToGridSetting(state.history.present, snapToGrid)
      }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  deleteSelectedShapes: () => {
    set(state => {
      const newPresent = { ...core.deleteSelectedShapes(state.history.present) }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  load: (externalState: core.PersistentState) => {
    set(state => {
      const newPresent = { ...state.history.present, ...externalState }
      return {
        history: addToHistory(state.history, newPresent)
      }
    })
  },

  // Undo action
  undo: () => {
    set(state => {
      return {
        history: undoHistory(state.history)
      }
    })
  },

  // Redo action
  redo: () => {
    set(state => {
      return {
        history: redoHistory(state.history)
      }
    })
  }
}))

export const getFullState = () => useStore.getState()

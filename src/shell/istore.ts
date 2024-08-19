import * as core from '@/model/core'
import { BoundingBox, Point, Size } from '@/model/geometry'
import { History } from '@/model/history'
import { SelectionToolMode, ToolType } from '@/model/tools'
import type { Shape } from '@/model/tools'

// Define a type for clipboard content
export type ClipboardContent = {
  serializedShapes: string
}
export interface IStore {
  // History State
  history: History
  // New clipboard-related properties and methods
  clipboard: ClipboardContent | null
  copySelectedShapes: () => void
  pasteShapes: () => void

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
  updateShape: (shape: Shape) => void
  setSnapToGridSetting: (snapToGrid: boolean) => void
  deleteSelectedShapes: () => void
  load: (state: core.PersistentState) => void

  // Undo/Redo Actions
  undo: () => void
  redo: () => void
}

import * as core from '@/model/core'
import { BoundingBox, Point, Size } from '@/model/geometry'
import { ReadonlyOrderedRecord } from '@/model/readonlyOrderedRecord'
import { SelectionToolMode, ToolType } from '@/model/tools'
import type { Shape } from '@/model/tools'

export interface IStore {
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
  updateShape: (shape: Shape) => void
  setSnapToGridSetting: (snapToGrid: boolean) => void
  deleteSelectedShapes: () => void
  load: (state: core.PersistentState) => void
}

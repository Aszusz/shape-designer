import { BoundingBox, Point, Size } from './geometry'
import { ReadonlyOrderedRecord } from './readonlyOrderedRecord'

export const SelectTool = 'select_tool'
export const PanTool = 'pan_tool'
export const RectangleTool = 'rectangle_tool'
export const EllipseTool = 'ellipse_tool'

export type ToolType =
  | typeof SelectTool
  | typeof PanTool
  | typeof RectangleTool
  | typeof EllipseTool

export const RectangleShape = 'rectangle_shape'
export const EllipseShape = 'ellipse_shape'

export type ShapeType = typeof RectangleShape | typeof EllipseShape

export type Shape = Readonly<{
  id: string
  type: ShapeType
  isSelected: boolean
}> &
  BoundingBox

export type State = Readonly<{
  toolType: ToolType
  canvasSize: Size
  dragStart?: Point
  currentMousePosition: Point
  shapes: ReadonlyOrderedRecord<Shape>
}>

export const initialState: State = {
  toolType: SelectTool,
  canvasSize: { width: 800, height: 600 },
  dragStart: undefined,
  currentMousePosition: { x: NaN, y: NaN },
  shapes: new ReadonlyOrderedRecord()
}

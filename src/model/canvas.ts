import { ReadonlyOrderedRecord } from './readonlyOrderedRecord'

export type Point = Readonly<{
  x: number
  y: number
}>

export type Size = Readonly<{
  width: number
  height: number
}>

export type BoundingBox = Point & Size

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

export function isInCanvas(point: Point, canvasSize: Size): boolean {
  return (
    point.x >= 0 &&
    point.x <= canvasSize.width &&
    point.y >= 0 &&
    point.y <= canvasSize.height
  )
}

export function limitToCanvas(point: Point, canvasSize: Size): Point {
  return {
    x: Math.min(Math.max(0, point.x), canvasSize.width),
    y: Math.min(Math.max(0, point.y), canvasSize.height)
  }
}

export function boundingBox(point1: Point, point2: Point): BoundingBox {
  // Calculate the top-left corner of the bounding box
  const x = Math.min(point1.x, point2.x)
  const y = Math.min(point1.y, point2.y)

  // Calculate the width and height of the bounding box
  const width = Math.abs(point2.x - point1.x)
  const height = Math.abs(point2.y - point1.y)

  return {
    x,
    y,
    width,
    height
  }
}

export function intersection(
  box1: BoundingBox,
  box2: BoundingBox
): BoundingBox | null {
  const xLeft = Math.max(box1.x, box2.x)
  const yTop = Math.max(box1.y, box2.y)
  const xRight = Math.min(box1.x + box1.width, box2.x + box2.width)
  const yBottom = Math.min(box1.y + box1.height, box2.y + box2.height)

  // Check if there is an overlap
  if (xLeft < xRight && yTop < yBottom) {
    const intersectionWidth = xRight - xLeft
    const intersectionHeight = yBottom - yTop

    return {
      x: xLeft,
      y: yTop,
      width: intersectionWidth,
      height: intersectionHeight
    }
  }

  // No intersection
  return null
}

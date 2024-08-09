// geometry.ts
export type Point = {
  readonly x: number
  readonly y: number
}

export type Size = {
  readonly width: number
  readonly height: number
}

export type BoundingBox = Point & Size

export function isIn(point: Point, box: BoundingBox): boolean {
  return (
    point.x >= box.x &&
    point.x <= box.width &&
    point.y >= box.y &&
    point.y <= box.height
  )
}

export function limitTo(point: Point, box: BoundingBox): Point {
  const x = Math.min(Math.max(point.x, box.x), box.x + box.width)
  const y = Math.min(Math.max(point.y, box.y), box.y + box.height)
  return { x, y }
}

export function boundingBox(point1: Point, point2: Point): BoundingBox {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2

  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)

  return { x, y, width, height }
}

export function intersection(
  box1: BoundingBox,
  box2: BoundingBox
): BoundingBox | null {
  const xLeft = Math.max(box1.x, box2.x)
  const yTop = Math.max(box1.y, box2.y)
  const xRight = Math.min(box1.x + box1.width, box2.x + box2.width)
  const yBottom = Math.min(box1.y + box1.height, box2.y + box2.height)

  if (xLeft < xRight && yTop < yBottom) {
    return {
      x: xLeft,
      y: yTop,
      width: xRight - xLeft,
      height: yBottom - yTop
    }
  }

  return null
}

export const isContained = (
  smaller: BoundingBox,
  larger: BoundingBox
): boolean => {
  const smallerRight = smaller.x + smaller.width
  const smallerBottom = smaller.y + smaller.height
  const largerRight = larger.x + larger.width
  const largerBottom = larger.y + larger.height

  const isContainedHorizontally =
    smaller.x >= larger.x && smallerRight <= largerRight
  const isContainedVertically =
    smaller.y >= larger.y && smallerBottom <= largerBottom

  return isContainedHorizontally && isContainedVertically
}

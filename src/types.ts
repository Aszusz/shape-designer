export type Tool = 'select' | 'pan' | 'rectangle' | 'ellipse'

export type State = {
  tool: Tool
  canvasWidth: number
  canvasHeight: number
  mousePosition: { x: number; y: number }
  dargStart?: { x: number; y: number }
}

export const initialState: State = {
  tool: 'select',
  canvasWidth: 800,
  canvasHeight: 600,
  mousePosition: { x: NaN, y: NaN },
  dargStart: undefined
}

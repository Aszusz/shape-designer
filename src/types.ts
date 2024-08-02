export type Tool = 'select' | 'pan' | 'rectangle' | 'ellipse'

export type State = {
  tool: Tool
  canvasWidth: number
  canvasHeight: number
}

export const initialState: State = {
  tool: 'select',
  canvasWidth: 800,
  canvasHeight: 600
}

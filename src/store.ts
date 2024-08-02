import { initialState, Tool } from './types'
import { create } from 'zustand'

export const useStore = create(() => initialState)

// Actions
export const setCanvasWidth = (canvasWidth: number) => {
  useStore.setState({ canvasWidth })
}

export const setCanvasHeight = (canvasHeight: number) => {
  useStore.setState({ canvasHeight })
}

export const setTool = (tool: Tool) => {
  useStore.setState({ tool })
}

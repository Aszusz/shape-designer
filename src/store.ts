import { initialState } from './types'
import { create } from 'zustand'

export const useStore = create(() => initialState)

// Actions
export const setCanvasWidth = (canvasWidth: number) => {
  useStore.setState({ canvasWidth })
}

export const setCanvasHeight = (canvasHeight: number) => {
  useStore.setState({ canvasHeight })
}

import { combineState, PersistentState, splitState, State } from '@/model/core'

export interface History {
  past: PersistentState[]
  present: State
  future: PersistentState[]
}

export const createInitialHistory = (initialState: State): History => ({
  past: [],
  present: initialState,
  future: []
})

export const addToHistory = (state: History, newPresent: State): History => {
  const { persistent: persistentState } = splitState(state.present)

  return {
    past: [...state.past, persistentState],
    present: newPresent,
    future: [] // Clear future states when a new action is taken
  }
}

export const undo = (state: History): History => {
  if (state.past.length === 0) return state

  const previousPersistentState = state.past[state.past.length - 1]
  const { volatile } = splitState(state.present)
  const newPast = state.past.slice(0, state.past.length - 1)

  const newPresent = combineState(previousPersistentState, volatile)

  return {
    past: newPast,
    present: newPresent,
    future: [splitState(state.present).persistent, ...state.future]
  }
}

export const redo = (state: History): History => {
  if (state.future.length === 0) return state

  const nextPersistentState = state.future[0]
  const { volatile } = splitState(state.present)
  const newFuture = state.future.slice(1)

  const newPresent = combineState(nextPersistentState, volatile)

  return {
    past: [...state.past, splitState(state.present).persistent],
    present: newPresent,
    future: newFuture
  }
}

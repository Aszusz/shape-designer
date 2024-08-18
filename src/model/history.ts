import { combineState, PersistentState, splitState, State } from '@/model/core'
import { shallow } from 'zustand/shallow'

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

export const addToHistory = (history: History, newState: State): History => {
  const oldPersistent = splitState(history.present).persistent
  const newPersistent = splitState(newState).persistent

  // Check if the persistent state has changed using Zustand's shallow equality check
  const persistentStateHasChanged = !shallow(oldPersistent, newPersistent)

  if (persistentStateHasChanged) {
    return {
      past: [...history.past, history.present],
      present: newState,
      future: [] // Clear future states when a new action is taken
    }
  } else {
    return {
      ...history,
      present: newState
    }
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

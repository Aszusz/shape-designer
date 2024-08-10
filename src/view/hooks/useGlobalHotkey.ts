import useEventListener from './useEventListener'
import { Key } from 'react'

type KeyCombination = {
  key: Key
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean // Command key on Mac or Windows key on Windows
}

export default function useGlobalHotkey(
  keyCombination: KeyCombination,
  callback: () => void
) {
  const {
    key,
    ctrl = false,
    alt = false,
    shift = false,
    meta = false
  } = keyCombination

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === key &&
      event.ctrlKey === ctrl &&
      event.altKey === alt &&
      event.shiftKey === shift &&
      event.metaKey === meta
    ) {
      event.preventDefault() // prevent default action for the key combination
      callback()
    }
  }

  useEventListener('keydown', handleKeyDown, document)
}

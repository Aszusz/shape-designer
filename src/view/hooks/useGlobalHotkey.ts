import useEventListener from './useEventListener'

type Key =
  | 'Backspace'
  | 'Tab'
  | 'Enter'
  | 'Shift'
  | 'Control'
  | 'Alt'
  | 'Pause'
  | 'CapsLock'
  | 'Escape'
  | 'Space'
  | 'PageUp'
  | 'PageDown'
  | 'End'
  | 'Home'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'PrintScreen'
  | 'Insert'
  | 'Delete'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'Meta'
  | 'ContextMenu'

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

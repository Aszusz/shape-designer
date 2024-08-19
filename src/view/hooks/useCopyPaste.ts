// lib/useCopyPaste.ts
import useGlobalHotkey from './useGlobalHotkey'
import { useStore } from '@/shell/store'
import { useCallback } from 'react'

export function useCopyPaste() {
  const { copySelectedShapes, pasteShapes } = useStore()

  const handleCopy = useCallback(() => {
    copySelectedShapes()
  }, [copySelectedShapes])

  const handlePaste = useCallback(() => {
    pasteShapes()
  }, [pasteShapes])

  // Set up hotkeys
  useGlobalHotkey({ key: 'c', ctrl: true }, handleCopy)
  useGlobalHotkey({ key: 'v', ctrl: true }, handlePaste)

  return { handleCopy, handlePaste }
}

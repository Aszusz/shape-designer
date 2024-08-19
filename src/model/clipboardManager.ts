// model/clipboardManager.ts
import { serializeShapes, deserializeShapes } from './core'
import { Shape } from './tools'

export class ClipboardManager {
  private clipboard: string | null = null

  copy(shapes: Shape[]) {
    this.clipboard = serializeShapes(shapes)
    // Optionally interact with system clipboard
    navigator.clipboard.writeText(this.clipboard).catch(console.error)
  }

  paste(): Shape[] | null {
    if (!this.clipboard) return null
    return deserializeShapes(this.clipboard)
  }

  clear() {
    this.clipboard = null
  }
}

export const clipboardManager = new ClipboardManager()
